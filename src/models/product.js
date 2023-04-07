import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 3,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
  },
  image:{
    type: String,
  },
  categoryId:{
    type: Number,
    require:true,
  }
});


export default mongoose.model("Product", productSchema);
