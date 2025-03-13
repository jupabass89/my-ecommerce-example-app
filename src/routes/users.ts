import express from "express";
const {
  postUser,
  patchCart,
  getUsers,
  patchtDocument,
  getDocument,
} = require("../controllers/users");
var router = express.Router();

/* GET users listing. */
router.get("/", getUsers);

/* POST  user */
router.post("/", postUser);

/* PATCH  user cart. */
router.patch("/cart", patchCart);

/* POST  file */
router.patch("/document", patchtDocument);

/* GET  FILE */
router.get("/document/:userId", getDocument);

module.exports = router;
