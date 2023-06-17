
const {Schema, model} = require('mongoose')

const cartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            
        },
        quantity: {
            type: Number,
            
        }
    }],
})

module.exports = model('Cart', cartSchema)