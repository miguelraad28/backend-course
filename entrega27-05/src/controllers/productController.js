const productManager = require("../managers/productManager")

const productController = {
    index: function (req, res) {
        if (req.query.limit) {
            let limit = Number(req.query.limit)
            const result = productManager.getProducts(limit)
            return res.render("products", result)
        } else {
            const result = productManager.getProducts()
            return res.render("products", {pageTitle: "Productos", ...result})
        }
    },
    show: function (req, res) {
        let pid = Number(req.params.pid)
        const result = productManager.getProductById(pid)
        return res.render("productDetail", {pageTitle: result.product.title, ...result})
    },
    update: function(req, res) {
        const pid = Number(req.params.pid)
        const newValues = req.body
        const result = productManager.updateProduct(pid, newValues)
        return res.json(result)
    },
    create: function (req, res) {
        const { title, description, price, thumbnail, code, stock, category, status } = req.body
        const result = productManager.addProduct(title, description, price, thumbnail, code, stock, category, status)
        return res.json(result)
    },
    destroy: function(req, res){
        const pid = req.params.pid
        const result = productManager.deleteProduct(pid)
        return res,json(result)
    }
}

module.exports = productController