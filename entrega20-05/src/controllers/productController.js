const productManager = require("../managers/productManager")

const productController = {
    index: function (req, res) {
        if (req.query.limit) {
            let limit = Number(req.query.limit)
            const result = productManager.getProducts(limit)
            return res.json(result)
        } else {
            const result = productManager.getProducts()
            return res.json(result)
        }
    },
    show: function (req, res) {
        let pid = Number(req.params.pid)
        const result = productManager.getProductById(pid)
        return res.json(result)
    },
    update: function(req, res) {
        const { title, description, price, thumbnail, code, stock, category, status } = req.body
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