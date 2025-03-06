import { NextFunction, Request, Response } from "express";
import AppError from "../core/custom-error";

const User = require("./../models/user");

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    if (!users.length) {
      throw new AppError("List of products can't be reached.", 400);
    }
    res.status(200).send(users);
  } catch (error: unknown) {
    next(error);
  }
};

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, age } = req.body;
    const user = new User({ name, age });
    const userAdded = await user.save();

    if (!userAdded) {
      throw new AppError("User can't be created.", 403);
    }

    res.status(200).send(userAdded);
  } catch (error: unknown) {
    next(error);
  }
};

const patchCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { products, userId } = req.body;
    const user = await User.updateOne({ _id: userId }, { cart: { products } });

    if (!user) {
      throw new AppError("Cart can't be updated.", 500);
    }

    res.status(200).send(user);
  } catch (error: unknown) {
    next(error);
  }
};

// const patchProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id, title, price } = req.body;
//     const prodUpodated = await Product.updateOne({ _id: id }, { title, price });

//     if (!prodUpodated) {
//       throw new AppError("Product can't be updated.", 500);
//     }
//     res.status(200).send(prodUpodated);
//   } catch (error: unknown) {
//     next(error);
//   }
// };

// const getProduct = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const prodId = req.params.id;
//     const product = await Product.findOne({ _id: prodId });
//     if (!product) {
//       throw new AppError("Product can't be reached.", 402);
//     }
//     res.status(200).send(product);
//   } catch (error: unknown) {
//     next(error);
//   }
// };

// const putProduct = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { id, title, price, description } = req.body;
//     const prodReplaced = await Product.replaceOne(
//       { _id: id },
//       { title, price, description }
//     );

//     if (!prodReplaced) {
//       throw new AppError("Product can't be replaced.", 404);
//     }

//     res.status(200).send(prodReplaced);
//   } catch (error: unknown) {
//     next(error);
//   }
// };

// const patchProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id, title, price } = req.body;
//     const prodUpodated = await Product.updateOne({ _id: id }, { title, price });

//     if (!prodUpodated) {
//       throw new AppError("Product can't be updated.", 500);
//     }
//     res.status(200).send(prodUpodated);
//   } catch (error: unknown) {
//     next(error);
//   }
// };

// const deleteProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const prodId = req.params?.id;
//     const deletedProduct = await Product.deleteOne({ _id: prodId });

//     if (!deletedProduct) {
//       throw new AppError("Product can't be deleted.", 506);
//     }
//     return res.status(200).send({ deleted: deletedProduct });
//   } catch (error: unknown) {
//     next(error);
//   }
// };

exports.getUsers = getUsers;
exports.patchCart = patchCart;
exports.postUser = postUser;
// exports.getProduct = getProduct;
// exports.putProduct = putProduct;
// exports.patchProduct = patchProduct;
// exports.deleteProduct = deleteProduct;
