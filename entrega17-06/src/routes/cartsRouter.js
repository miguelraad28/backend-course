const { Router } = require("express")
const router = Router()
const cartServices = require("../services/cartServices")

// router.post("/", cartsServices.create)
// router.get("/:cid", cartsServices.show)
// router.post("/:cid/product/:pid", cartsServices.add)
router.get("/", async (req, res) => {
    const result = await cartServices.getCarts()
    return res.json({ message: "Lista de carritos", carts: result })
})
router.get("/new", async (req, res) => {
    const result = await cartServices.newCart()
    return res.json({ message: "Carrito creado", newCart: result })
})
router.delete("/:cid/product/:pid", async (req, res) => {
    return res.redirect("/products")
})
router.put("/:cid", async (req, res) => {
    return res.redirect("/products")
})
// Añadir en el carrito el parametro el producto en parametro
router.get("/:cid/product/:pid", async (req, res) => {
    await cartServices.addNewProduct(req.params.cid, req.params.pid)
    return res.redirect("/products")
})
// Actualizar cantidad del producto ya existente
router.put("/:cid/product/:pid", async (req, res) => {
    return res.redirect("/products")
})

module.exports = router