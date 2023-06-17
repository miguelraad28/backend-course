const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io")
const productManager = require("./dao/managersFS/productManager")
require("./utils/dbconnection")
const app = express()
const httpServer = app.listen(8080, () => console.log("Server en puerto 8080"))
const socketServer = new Server(httpServer)
const messageServices = require("./services/messageServices");
socketServer.on("connection", (socket) => {
    socket.on("addProduct", (newProduct) => {
        const { title, description, price, thumbnail, code, stock, category, status } = newProduct
        console.log(newProduct)
        const message = productManager.addProduct(title, description, price, thumbnail, code, stock, category, status)
        const result = productManager.getProducts()
        result.message = message.message
        socket.broadcast.emit("getProducts", result)
    });
    socket.on("chatMessage", async (socket) => {
        const messages = await messageServices.create(socket)
        socketServer.emit("getAllMessages", messages)
    })
    
    messageServices.index().then(messages => socketServer.emit("getAllMessages", messages))
    const result = productManager.getProducts()
    socket.emit("getProducts", result)
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/public", express.static(__dirname + "/public"))


const chatRouter = require("./routes/chatRouter")
const cartsRouter = require("./routes/cartsRouter")
const productsRouter = require("./routes/productsRouter");


app.get("/", (req, res) => {
    return res.render("index", { pageTitle: "HOME" })
})

app.use("/chat", chatRouter)
//app.use("/messages", messagesRouter)
app.use("/products", productsRouter)
app.use("/carts", cartsRouter)
app.get("/realTimeProducts", (req, res) => { return res.render("realTimeProducts", { pageTitle: "RTProucts" }) })