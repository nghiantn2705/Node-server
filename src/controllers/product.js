import Joi from "joi";
import Product from "../models/product.js";
import Category from "../models/category.js";
import dotenv from "dotenv";
dotenv.config();
const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string(),
  image: Joi.string().required(),
  categoryId: Joi.string().required(),
  _id: Joi.string(),
});

export const getAll = async (req, res) => {
  try {
   
    const products = await Product.find().populate("categoryId");
    if (products.length === 0) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
      
    }
    return res.json(products);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const get = async function (req, res) {
  try {

    const product = await Product.findById(req.params.id).populate("categoryId");


    if (!product) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        datas: [],
      });
    }
    const product = await Product.create(req.body);
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });
    // { $addToSet: { <field1>: <value1>, ... } }

    if (!product) {
      return res.status(400).json({
        message: "Thêm sản phẩm thất bại",
        datas: [],
      });
    }
    return res.status(200).json({
      message: "Thêm sản phẩm thành công",
      data: [product],
    });
  } catch (error) {
    return res.status(400).json({
      message: "Loi server",
      datas: [],
    });
  }
};
export const updatePut = async function (req, res) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    return res.json({
      message: "Cập nhật sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const remove = async function (req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
