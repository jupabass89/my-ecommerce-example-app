import express, { NextFunction, Request, Response } from "express";
var router = express.Router();

/* GET users listing. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("respond with a resource");
});

module.exports = router;
