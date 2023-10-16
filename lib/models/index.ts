import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    url: String,
    title: String,
    currency: String,
    imageUrl: String,
    originalPrice: String,
    currPrice: String,
    lowestPrice: Number,
    priceHistory: {
      price: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
    highestPrice: Number,
    description: String,
    users: [{ email: String }],
    default: [],
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models?.Product || mongoose.model("Product", productSchema);

export default Product;
