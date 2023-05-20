const express = require("express");

const app = express()
app.listen(8080,() => console.log("Server en puerto 8080"))

const cartsRouter = require("./routes/cartsRouter")
const productsRouter = require("./routes/productsRouter")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/carts", cartsRouter)
app.use("/products", productsRouter)