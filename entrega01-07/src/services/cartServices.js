const Cart = require("../dao/models/Cart")

class CartServices {
    async getCarts() {
        const result = await Cart.find().populate("products.product")
        return result
    }
    async getCart(cid) {
        const result = await Cart.findById(cid).populate("products.product")
        return result
    }
    async newCart() {
        const newCart = await Cart.create({ products: [] })
        newCart.save()
        return newCart
    }
    async addNewProduct(cartId, productId) {
        const cart = await Cart.findById(cartId)
        if (cart.products.some(product => product.product == productId)) {
            cart.products.find(product => product.product == productId).quantity++
        } else {
            cart.products.push({ product: productId, quantity: 1 })
        }
        cart.save()
        return cart
    }
    async removeProduct(cartId, productId) {
        const cart = await Cart.findById(cartId)
        if (cart.products.some(product => product.product != productId)) return res.json({ message: "No existe un producto con ese ID en el carrito" })
        cart.products.splice(cart.products.findIndex(product => product.product == productId), 1)
        cart.save()
        return res.json({message: "Carrito actualizado", cart: cart})

    }
}

const cartServices = new CartServices();

module.exports = cartServices;