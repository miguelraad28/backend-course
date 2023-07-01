const Product = require("../dao/models/Product")

class ProductServices {
  async getProducts({limit = 10, page = 1, sort= {}, query= {}}) {
    const result = await Product.paginate(
      {},
      { limit: limit, page: page, sort: sort, query: query }
    );

    return result;
  }
  async getProduct(pid) {
    const product = await Product.findById(pid);
    return product
  }
  async createProduct(product) {
    const newProduct = await Product.create(product);
    newProduct.save();
    return { message: "Product created", product: newProduct };
  }
  async updateProduct(pid, product) {
    const productUpdated = await Product.updateOne({ _id: pid }, product);
    return { message: "Product updated", product: productUpdated }
  }
  async deleteProduct(pid) {
    await Product.findByIdAndDelete(pid);
    return { message: "Product deleted" };
  }
}

const productServices = new ProductServices();

module.exports = productServices;