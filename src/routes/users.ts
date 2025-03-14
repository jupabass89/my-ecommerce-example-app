import express from "express";
const {
  postUser,
  patchCart,
  getUsers,
  postLogin,
  getUserInfo,
  patchtDocument,
  getDocument,
} = require("../controllers/users");
var router = express.Router();

/* POST Login. */
router.post("/login", postLogin);

/* GET users listing. */
router.get("/", getUsers);

/* GET user info. */
router.get("/user-info/:userId", getUserInfo);

/* POST  user */
router.post("/", postUser);

/* PATCH  user cart. */
router.patch("/cart", patchCart);

/* POST  file */
router.patch("/document", patchtDocument);

/* GET  file */
router.get("/document/:userId", getDocument);

module.exports = router;
