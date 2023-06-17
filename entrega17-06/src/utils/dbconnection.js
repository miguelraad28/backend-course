const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://mikestarker28:Saoh8nVslWqrHnMq@cluster0.kyr4bq9.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Conectado a la base de datos"))
.catch(err => console.log(err))
