const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io")
const productManager = require("./managers/productManager")

const app = express()
const httpServer = app.listen(8080, () => console.log("Server en puerto 8080"))
const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) => {
    socket.on("addProduct", (newProduct) => {
        const {title, description, price, thumbnail, code, stock, category, status} = newProduct
        console.log(newProduct)
        const message = productManager.addProduct(title, description, price, thumbnail, code, stock, category, status)
        const result = productManager.getProducts()
        result.message = message.message
        socket.emit("getProducts", result)
    });
    const result = productManager.getProducts()
    socket.emit("getProducts", result)
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/public", express.static(__dirname + "/public"))

const cartsRouter = require("./routes/cartsRouter")
const productsRouter = require("./routes/productsRouter")

app.get("/", (req, res) => {
    return res.render("index", { pageTitle: "HOME", frase: "ESTE ES EL INDEX PARTIALS" })
})
app.use("/carts", cartsRouter)
app.use("/products", productsRouter)
app.get("/realTimeProducts", (req, res) => {return res.render("realTimeProducts", {pageTitle: "RTProucts"})})