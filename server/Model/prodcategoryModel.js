import mongoose from "mongoose" // Erase if already required

// Declare the Schema of the Mongo model
var prodcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    subcategories: {type:Array},
  },

  {
    timestamps: true,
  }
);

//Export the model
export const Category = mongoose.model("PCategory", prodcategorySchema);
