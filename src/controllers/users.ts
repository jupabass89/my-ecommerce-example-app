import { NextFunction, Request, Response } from "express";
import AppError from "../core/custom-error";

const bcrypt = require("bcrypt");
const path = require("path");

const User = require("./../models/user");

const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new AppError("User dont exist.", 401);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AppError("Password incorrect.", 401);
    }
    res.status(200).send({ message: "You are LogedIn!" });
  } catch (error: unknown) {
    next(error);
  }
};

const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User can't be reached.", 400);
    }
    const { name, email, cart } = user;
    const showUser = { name, email, cart };
    res.status(200).send(showUser);
  } catch (error: unknown) {
    next(error);
  }
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    if (!users.length) {
      throw new AppError("List of users can't be reached.", 400);
    }
    res.status(200).send(users);
  } catch (error: unknown) {
    next(error);
  }
};

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    type PostUser = Pick<
      typeof req.body,
      "name" | "age" | "email" | "password"
    >;
    const postUser: PostUser = { ...req.body };
    const prevUser = await User.findOne({ email: postUser.email });

    if (prevUser) {
      throw new AppError("El usuario ya existe.", 200);
    }
    const hashedPass = await bcrypt.hash(postUser.password, 12);
    const user = new User({ ...postUser, password: hashedPass });
    const userAdded = await user.save();

    if (!userAdded) {
      throw new AppError("User can't be created.", 500);
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

const patchtDocument = async (
  req: any, // fix
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    const document = req?.file;
    console.log(document);
    const user = await User.updateOne(
      { _id: userId },
      {
        document: {
          data: document.buffer,
          contentType: document.mimetype,
          fileName: document.filename,
        },
      }
    );

    if (!user) {
      throw new AppError("User not found.", 403);
    }

    res.status(200).send(user);
  } catch (error: unknown) {
    next(error);
  }
};

const getDocument = async (
  req: any, // fix
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found.", 403);
    }

    const filePath = path.join(
      __dirname,
      "../../uploads",
      user.document.fileName
    );

    res.setHeader("Content-Type", user.document.contentType);
    res.setHeader("Content-Disposition", 'attachment; filename="document.pdf"');
    res.download(filePath, user.document.fileName); // Triggers a file download
  } catch (error: unknown) {
    next(error);
  }
};

exports.postLogin = postLogin;
exports.getUsers = getUsers;
exports.postUser = postUser;
exports.patchCart = patchCart;
exports.getUserInfo = getUserInfo;
exports.getDocument = getDocument;
exports.patchtDocument = patchtDocument;
