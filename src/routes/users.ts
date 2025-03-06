import express from "express";
const { postUser, patchCart, getUsers } = require("../controllers/users");
var router = express.Router();

/* GET users listing. */
router.get("/", getUsers);

/* POST  user */
router.post("/", postUser);

/* PATCH  user cart. */
router.patch("/cart", patchCart);

module.exports = router;
