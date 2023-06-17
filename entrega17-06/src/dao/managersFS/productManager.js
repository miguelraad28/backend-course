const fs = require("fs");
const Product = require("../models/Product")
class ProductManager {
    #products
    #path
    constructor(path) {
        this.#products = []
        this.#path = path
        if (!fs.existsSync(this.#path, "utf-8")) {
            fs.writeFileSync(this.#path, "[]");
        }
    }
    addProduct(title, description, price, thumbnail, code, stock, category, status) {
        this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
        if (title == undefined || description == undefined || price == undefined || code == undefined || stock == undefined || category == undefined) return { message: "Todos los campos son obligatorios. EXCEPTO THUMBNAIL" }
        if (this.#products.find(p => p.code === code)) return { message: "Ya existe un producto con este codigo" }
        if (isNaN(Number(price)) || isNaN(Number(stock))) return { message: "el precio y el stock deben ser de valor numérico" }
        if (isNaN(price) || isNaN(stock)) return { message: "El precio y el stock deben ser de valores numéricos" }
        if (!Array.isArray(thumbnail)) return { message: "La propiedad 'thumbnail' debe ser un array de rutas de imágenes" }
        const latestId = this.#products[this.#products.length - 1].id
        console.log(latestId)

        const newProduct = new Product(latestId, title, description, Number(price), thumbnail, code, Number(stock), category, status)
        this.#products.push(newProduct)
        fs.writeFileSync(this.#path, JSON.stringify(this.#products))

        return { message: "Producto Añadido", success: true }
    }
    getProducts(limit) {
        this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
        if (limit) {
            return { products: this.#products.slice(0, limit), success: true }
        } else {
            return { products: this.#products, success: true }
        }
    }
    getProductById(pid) {
        this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
        if (this.#products.find(p => p.id === pid)) {
            const productFound = this.#products.find(p => p.id === pid)
            return { product: productFound, success: true }
        }
        return { message: "No existe un producto con ese id" }
    }
    deleteProduct(pid) {
        this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
        if (this.#products.find(p => p.id === pid)) {
            this.#products.splice(this.#products.indexOf(this.#products.find(p => p.id === pid)), 1)
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            return { message: "Producto Eliminado", success: true }
        } else {
            return { message: "No se encontró un producto con el id indicado" }
        }
    }
    updateProduct(pid, newValues) {
        this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
        if (newValues.id) return { message: "No puedes modificarle el id a un producto" }
        else if (this.#products.find(p => p.id === pid)) {
            const productFound = this.#products.find(p => p.id === pid)
            Object.assign(productFound, newValues);
            console.log(productFound)
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            return { message: "Producto actualizado", productUpdated: productFound, success: true }
        } else {
            return { message: "No se encontró un producto con el id indicado" }
        }
    }
}
module.exports = productManager = new ProductManager("./src/dao/db/products.json")