const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        max: 100
    },
    lastName: {
        type: String,
        required: true,
        max: 100
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    rol: {
        type: String,
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("User", userSchema)