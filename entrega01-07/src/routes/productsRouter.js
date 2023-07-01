const { Router } = require("express")
const router = Router()
const productServices = require("../services/productServices")

router.get("/", async (req, res) => {
    let params = req.query
    const result = await productServices.getProducts(params)
    console.log(result)
    let products = result
    return res.render("products",
        {
            products: result.docs.map(product => product.toObject()),
            pageTitle: "Products",
            pagingCounter: result.pagingCounter,
            page: result.page,
            totalPages: result.totalPages,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage
        })
})
// router.get("/:pid", productsServices.show)
// router.put("/:pid", productsServices.update)
router.get("/:pid", async (req, res) => {
    const result = await productServices.getProduct(req.params.pid)
    const product = { ...result._doc }
    
    return res.render("productDetail", { product: product, pageTitle: "Product" })
})
router.get("/create", async (req, res) => {
    return res.render("createProduct", { pageTitle: "Create Product" })
})
router.post("/create", async (req, res) => {
    console.log(req.body)
    const { title, description, price, thumbnail, code, stock, category, status } = req.body
    if (title != "" && description != "" && price != "" && thumbnail != "" && code != "" && stock != "" && category != "" && status != "") {
        await productServices.createProduct(req.body)
        return res.redirect("/products")
    } else {
        res.locals.message = "Todos los campos son obligatorios"
        return res.render("createProduct", { pageTitle: "Create Product" })
    }
})

// router.delete("/:pid", productsServices.destroy)

module.exports = router