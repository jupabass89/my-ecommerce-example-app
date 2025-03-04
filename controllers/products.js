const Product = require("./../models/product");

const getProducts = async (_, res) => {
  const products = await Product.find();

  if (products) {
    return res.status(200).send(products);
  }
  res.status(500).send("No products!");
};

const postProduct = async (req, res) => {
  const { title, price, description } = req.body;
  const newProd = new Product({ title, price, description });
  const prodInserted = await newProd.save();

  if (prodInserted) {
    return res.status(200).send(prodInserted);
  }

  return res.status(500).send({});
};

const putProduct = async (req, res) => {
  try {
    const { id, title, price, description } = req.body;
    const prodReplaced = await Product.replaceOne(
      { _id: id },
      { title, price, description }
    );

    if (prodReplaced) {
      return res.status(200).send(prodReplaced);
    }

    res.status(500).send({ error: "error catched :(" });
  } catch (error) {
    res.status(500).send({ error: "error catched :(" });
  }
};

const patchProduct = async (req, res) => {
  try {
    const { id, title, price } = req.body;

    const prodUpodated = await Product.updateOne({ _id: id }, { title, price });

    if (prodUpodated) {
      return res.status(200).send(prodUpodated);
    }

    res.status(500).send({ error: "error :(" });
  } catch (error) {
    res.status(500).send({ error: "error catched :(" });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const prodId = req.params?.id;
    const deletedProduct = await Product.deleteOne({ _id: prodId });

    if (deletedProduct) {
      return res.status(200).send({ deleted: deletedProduct });
    }

    res.status(500).send({ error: "error :(" });
  } catch (error) {
    res.status(500).send({ error: "error catched :(" });
  }
}

exports.getProducts = getProducts;
exports.postProduct = postProduct;
exports.putProduct = putProduct;
exports.patchProduct = patchProduct;
exports.deleteProduct = deleteProduct;
