const { Schema, model } = require('mongoose')

const messageSchema = new Schema({

    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Message', messageSchema)
