const { Router } = require("express")
const router = Router()
const cartController = require("../controllers/cartController")

router.post("/", cartController.create)
router.get("/:cid", cartController.show)
router.post("/:cid/product/:pid", cartController.add)

module.exports = router