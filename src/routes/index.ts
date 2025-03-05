import express, { NextFunction, Request, Response } from "express";
var router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send({ title: "Express home" });
});

module.exports = router;
