const Message = require("../dao/models/Message")

const messagesServices = {
    index: async () => {
        const messages = await Message.find()
        return messages
    },
    create: async (data) => {
        const newMessage = new Message(data)
        await newMessage.save()
        const messages = await Message.find()
        return messages
    }
}

module.exports = messagesServices