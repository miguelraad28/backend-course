const { Schema, model } = require("mongoose")

const productSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    thumbnail: [{
        type: String
    }],
    code: {
        type: String
    },
    stock: {
        type: Number
    },
    category: {
        type: String
    },
    status: {
        type: Boolean
    }
})
productSchema.plugin(require("mongoose-paginate-v2"))
module.exports = model("Product", productSchema)