import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt:Date
      },
    ],

    ratings: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    comments: {
      type: Number,
      default: 0,
    },

    images: {
      type: Array,
      required: true,
    },
  },

  { timestamps: true }
);
export const Product = mongoose.model("product", productSchema);
//export default Product;
