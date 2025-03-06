import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  cart: {
    products: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
      },
    ]
  },
});

module.exports = mongoose.model("User", userSchema);
