const fs = require("fs");
const Cart = require("../schemas/Cart")
const productManager = require("./productManager")

class CartManager {
    #carts
    #path
    constructor(path) {
        this.#carts = []
        this.#path = path
        if (!fs.existsSync(this.#path, "utf-8")) {
            fs.writeFileSync(this.#path, "[]");
        } 
    }
    addCart() {
        this.#carts = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
        const latestId = this.#carts[this.#carts.length - 1].id
        const newCart = new Cart(latestId)
        this.#carts.push(newCart)
        fs.writeFileSync(this.#path, JSON.stringify(this.#carts))
        return {message: "Carrito creado", success: true}
    }
    getCartById(cid){
        this.#carts = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
        if (this.#carts.find(c => c.id === cid)) {
            const cartFound = this.#carts.find(c => c.id === cid)
            return { cart: cartFound, success: true }
        }
        return { message: "No existe un carrito con ese id" }
    }
    addToCart(cid, pid){
        this.#carts = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
        if (this.#carts.find(c => c.id === cid)) {
            const cartFound = this.#carts.find(c => c.id === cid)
            const result = productManager.getProductById(pid)
            if(!result.success) return {message: "El carrito existe pero el producto a añadir no"}
            const productFound = cartFound.products.find(p => p.id === pid)
            if(productFound){
                productFound.quantity = ++productFound.quantity 
            }else{
                const newProduct = {
                    id: result.product.id,
                    quantity: 1
                }
                cartFound.products.push(newProduct)
            }
            console.log(this.#carts)
            fs.writeFileSync(this.#path, JSON.stringify(this.#carts))
            return { cart: cartFound, message: `Producto ID ${pid} agregado a Carrito ID ${cid}`,success: true }
        } else {return {message: "El carrito con ese id es inexistente"}}
    }
}

module.exports = cartManager = new CartManager("./src/db/carts.json")
