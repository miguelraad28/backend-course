const { Router } = require("express")
const router = Router()
const productController = require("../controllers/productController")

router.get("/", productController.index)
router.get("/:pid", productController.show)
router.put("/:pid", productController.update)
router.post("/create", productController.create)
router.delete("/:pid", productController.destroy)

module.exports = router