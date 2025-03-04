const express = require("express");
const router = express.Router();
const Product = require("./../models/product");

/* GET products. */
router.get("/", async (req, res, next) => {
  const products = await Product.find();

  if (products) {
    return res.status(200).send(products);
  }
  res.status(500).send("No products!");
});

/* POST product */
router.post("/", async (req, res, next) => {
  const { title, price, description } = req.body;
  const newProd = new Product({ title, price, description });
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
});

/* PATCH product (UPDATE)*/
router.patch("/", async (req, res, next) => {
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
});

/* DELETE product */
router.delete("/:id", async (req, res, next) => {
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
});

module.exports = router;
