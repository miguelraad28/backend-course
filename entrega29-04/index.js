class ProductManager {
    #products
    static idCounter = 0
    constructor(title, description, price, thumbnail, code, stock) {
        this.#products = []
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if(title == undefined || description == undefined || price == undefined ||thumbnail == undefined || code == undefined || stock == undefined) return console.log("Todos los campos son obligatorios")
        if(this.#products.find(p => p.code === code)) return console.log("Ya existe un producto con este codigo")
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ++ProductManager.idCounter
        }
        this.#products.push(newProduct)
        return console.log("Producto Añadido")
    }
    getProducts() {
        return console.log(this.#products)
    }
    getProductById(pid) {
        if(this.#products.find(p => p.id === pid)) {
            const productFound = this.#products.find(p => p.id === pid)
            return console.log(productFound)
        }
        return console.log("No existe un producto con ese id")
    }
}
const productManager = new ProductManager()

productManager.addProduct("Carro", "Muy veloz", "200000", "/images/carro.png", "2", 5)
productManager.addProduct("Celu", "Muy veloz", "200000", "/images/carro.png", "2", 5)
productManager.addProduct("Laptop", "Muy veloz", "200000", "/images/carro.png", "4", 5)
productManager.addProduct("Telefono", "Muy veloz", "200000", "/images/carro.png", "5", 5)
productManager.addProduct("Mouse", "Muy veloz", "200000", "/images/carro.png", "6", 5)
productManager.addProduct("Teclado", "Muy veloz", "200000", "/images/carro.png", "7", 5)
productManager.addProduct("Monitor", "Muy veloz", "200000", "/images/carro.png", "8", 5)
productManager.addProduct("Razen", "Muy veloz", "200000", "/images/carro.png", "9", 5)

//productManager.getProducts()

//productManager.getProductById(1)