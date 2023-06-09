class Product {
    static idCounter = 0
    constructor(latestId, title, description, price, thumbnail, code, stock, category, status) {
        Product.idCounter = latestId
        this.id = ++Product.idCounter
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.category = category
        this.status = status || true
    }
}

module.exports = Product