import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,})

  const product = mongoose.model("products",productSchema);

  export default product;