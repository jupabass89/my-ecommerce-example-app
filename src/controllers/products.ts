import { NextFunction, Request, Response } from "express";
import AppError from "../core/custom-error";

const Product = require("./../models/product");

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    if (!products.length) {
      throw new AppError("List of products can't be reached.", 400);
    }
    res.status(200).send(products);
  } catch (error: unknown) {
    next(error);
  }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prodId = req.params.id;
    const product = await Product.findOne({ _id: prodId });
    if (!product) {
      throw new AppError("Product can't be reached.", 402);
    }
    res.status(200).send(product);
  } catch (error: unknown) {
    next(error);
  }
};

const postProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, price, description } = req.body;
    const newProd = new Product({ title, price, description });
    const prodInserted = await newProd.save();

    if (!prodInserted) {
      throw new AppError("Product can't be created.", 403);
    }

    res.status(200).send(prodInserted);
  } catch (error: unknown) {
    next(error);
  }
};

const putProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, title, price, description } = req.body;
    const prodReplaced = await Product.replaceOne(
      { _id: id },
      { title, price, description }
    );

    if (!prodReplaced) {
      throw new AppError("Product can't be replaced.", 404);
    }

    res.status(200).send(prodReplaced);
  } catch (error: unknown) {
    next(error);
  }
};

const patchProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, title, price } = req.body;
    const prodUpodated = await Product.updateOne({ _id: id }, { title, price });

    if (!prodUpodated) {
      throw new AppError("Product can't be updated.", 500);
    }
    res.status(200).send(prodUpodated);
  } catch (error: unknown) {
    next(error);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prodId = req.params?.id;
    const deletedProduct = await Product.deleteOne({ _id: prodId });

    if (!deletedProduct) {
      throw new AppError("Product can't be deleted.", 506);
    }
    return res.status(200).send({ deleted: deletedProduct });
  } catch (error: unknown) {
    next(error);
  }
};

exports.getProducts = getProducts;
exports.getProduct = getProduct;
exports.postProduct = postProduct;
exports.putProduct = putProduct;
exports.patchProduct = patchProduct;
exports.deleteProduct = deleteProduct;
