const express = require("express");
const router = express.Router();
const Product = require("./../models/product");

/* GET products. */
router.get("/", async (req, res, next) => {
  const products = await Product.getAll();

  return res.status(200).send(products);
});

/* GET product by ID */
router.get("/:id", async (req, res, next) => {
  const productId = req.params?.id;
  const response = await Product.get(productId);

  return res.status(200).send(response);
});

/* POST product */
router.post("/", async (req, res, next) => {
  const { title, price, description } = req.body;
  const newProd = new Product(title, price, description);
  const prodInserted = await newProd.save();

  if (prodInserted) {
    return res.status(200).send(prodInserted);
  }

  return res.status(500).send({});
});

/* PUT product (REPLACE)*/
router.put("/", async (req, res, next) => {
  try {
    const { id, title, price, description } = req.body;
    const product = new Product(title, price, description);
    const prodReplaced = await product.replaceProduct(id);

    if (prodReplaced) {
      return res.status(200).send(prodReplaced);
    }

    res.status(500).send({ error: "error catched :(" });
  } catch (error) {
    res.status(500).send({ error: "error catched :(" });
  }
});

/* PATCH product (UPDATE)*/
router.patch("/", async (req, res, next) => {
  try {
    const { id, title, price } = req.body;
    const prodUpodated = await Product.updateProduct({ title, price }, id);

    if (prodUpodated) {
      return res.status(200).send(prodUpodated);
    }

    res.status(500).send({ error: "error catched :(" });
  } catch (error) {
    res.status(500).send({ error: "error catched :(" });
  }
});

/* DELETE product */
router.delete("/:id", async (req, res, next) => {
  try {
    const prodId = req.params?.id;
    console.log('prodId ****', prodId)
    const deletedProduct = await Product.deleteProduct(prodId);

    if (deletedProduct) {
      return res.status(200).send({deleted: deletedProduct});
    }

    res.status(500).send({ error: "error :(" });
  } catch (error) {
    res.status(500).send({ error: "error catched :(" });
  }
});

module.exports = router;
