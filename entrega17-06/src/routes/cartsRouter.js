const { Router } = require("express")
const router = Router()
const cartservices = require("../services/cartServices")

// router.post("/", cartsServices.create)
// router.get("/:cid", cartsServices.show)
// router.post("/:cid/product/:pid", cartsServices.add)
router.delete("/:cid/product/:pid", cartServices.remove)
router.put("/:cid", cartServices.remove)
// Actualizar cantidad del producto ya existente
router.put("/:cid/product/:pid", cartServices.update)

module.exports = router