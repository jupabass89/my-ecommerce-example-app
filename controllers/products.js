const Product = require("./../models/product");

const getProducts = async (_, res, next) => {
  try {
    const products = await Product.find();
    if (!products.length) {
      throw new Error();
    }
    res.status(200).send(products);
  } catch (error) {
    error.customMessage = "List of products can't be reached.";
    error.statusCode = 500;
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const prodId = req.params.id;
    const product = await Product.findOne({ _id: prodId });
    if (!product) {
      throw new Error();
    }
    res.status(200).send(product);
  } catch (error) {
    error.customMessage = "Product can't be reached.";
    error.statusCode = 500;
    next(error);
  }
};

const postProduct = async (req, res, next) => {
  try {
    const { title, price, description } = req.body;
    const newProd = new Product({ title, price, description });
    const prodInserted = await newProd.save();

    if (!prodInserted) {
      throw new Error();
    }

    res.status(200).send(prodInserted);
  } catch (error) {
    error.customMessage = "Product can't be created.";
    error.statusCode = 500;
    next(error);
  }
};

const putProduct = async (req, res, next) => {
  try {
    const { id, title, price, description } = req.body;
    const prodReplaced = await Product.replaceOne(
      { _id: id },
      { title, price, description }
    );

    if (!prodReplaced) {
      throw new Error();
    }

    res.status(200).send(prodReplaced);
  } catch (error) {
    error.customMessage = "Product can't be replaced.";
    error.statusCode = 500;
    next(error);
  }
};

const patchProduct = async (req, res, next) => {
  try {
    const { id, title, price } = req.body;
    const prodUpodated = await Product.updateOne({ _id: id }, { title, price });

    if (!prodUpodated) {
      throw new Error();
    }
    res.status(200).send(prodUpodated);
  } catch (error) {
    error.customMessage = "Product can't be updated.";
    error.statusCode = 500;
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const prodId = req.params?.id;
    const deletedProduct = await Product.deleteOne({ _id: prodId });

    if (!deletedProduct) {
      throw new Error();
    }
    return res.status(200).send({ deleted: deletedProduct });
  } catch (error) {
    error.customMessage = "Product can't be deleted.";
    error.statusCode = 500;
    next(error);
  }
};

exports.getProducts = getProducts;
exports.getProduct = getProduct;
exports.postProduct = postProduct;
exports.putProduct = putProduct;
exports.patchProduct = patchProduct;
exports.deleteProduct = deleteProduct;
