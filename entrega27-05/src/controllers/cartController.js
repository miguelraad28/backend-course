const CartManager = require("../managers/cartManager")


const cartController = {
    create: function (req, res) {
        result = cartManager.addCart()
        return res.json(result)
    },
    show: function(req, res) {
        let cid = Number(req.params.cid)
        const result = cartManager.getCartById(cid)
        return res.json(result)
    },
    add: function(req, res){
        const cid = req.params.cid
        const pid = req.params.pid
        const result = cartManager.addToCart(Number(cid), Number(pid))
        return res.json(result)
    }
}

module.exports = cartController