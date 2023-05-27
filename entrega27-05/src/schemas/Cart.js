class Cart {
    static idCounter = 0
    constructor(latestId, products) {
        Cart.idCounter = latestId
        this.id = ++Cart.idCounter
        this.products = products || []
    }
}

module.exports = Cart