const { getDb } = require("./../core/database");
const { ObjectId } = require("mongodb");

class Product {
  constructor(title, price, description) {
    this.title = title;
    this.price = price;
    this.description = description;
  }

  save() {
    const db = getDb();
    return db.collection("products").insertOne(this);
  }

  static get(id) {
    const db = getDb();
    return db.collection("products").findOne(new ObjectId(`${id}`));
  }

  static getAll() {
    const db = getDb();

    return db.collection("products").find().toArray();
  }

  replaceProduct(id) {
    const db = getDb();

    return db.collection("products").replaceOne(
      { _id: new ObjectId(`${id}`) }, // Filter condition
      this
    );
  }

  static updateProduct(updateFields, id) {
    const db = getDb();

    return db.collection("products").updateOne(
      { _id: new ObjectId(`${id}`) }, // Filter condition
      { $set: updateFields }
    );
  }

  static deleteProduct(id) {
    const db = getDb();

    return db.collection("products").deleteOne({ _id: new ObjectId(`${id}`) });
  }
}

module.exports = Product;
