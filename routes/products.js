const express = require("express");
const router = express.Router();
const {
  getProducts,
  postProduct,
  putProduct,
  patchProduct,
  deleteProduct,
} = require("./../controllers/products");

/* GET products. */
router.get("/", getProducts);

/* POST product */
router.post("/", postProduct);

/* PUT product (REPLACE)*/
router.put("/", putProduct);

/* PATCH product (UPDATE)*/
router.patch("/", patchProduct);

/* DELETE product */
router.delete("/:id", deleteProduct);

module.exports = router;
