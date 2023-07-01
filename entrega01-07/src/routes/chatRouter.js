const { Router } = require("express")
const router = Router()

router.get("/", async(req, res) => {
    return res.render("chat", { pageTitle: "CHAT"})
})


module.exports = router