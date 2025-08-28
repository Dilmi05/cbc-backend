import product from '../models/product.js';
import Product from '../models/product.js';
import { isAdmin } from './userController.js'; // Importing isAdmin function for admin check
import jwt from "jsonwebtoken";
// Create a new product (admin only)
export function createProduct(req, res) {
    if (!isAdmin(req)) {
        return res.json({
            message: "Please login as administrator to add a product"
        });
    }

    const data = req.body;

    const newProduct = new Product(data);
    newProduct.save()
        .then(() => res.json({ message: 'Product created successfully' }))
        .catch((err) => res.status(403).json({
            message: "Error creating product",
            error: err.message
        }));
}

// Get all products
export function getProducts(req, res) {
    Product.find({})
        .then((products) => res.json(products))
        .catch((err) => res.json({
            message: "Error fetching products",
            error: err.message
        }));
}
 

export function deleteProduct(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Please login as admin account to delete product"
        });
    }

    const productId = req.params.productId;

    Product.deleteOne({ productId: productId })
        .then(() => {
            res.json({
                message: "Product deleted"
            });
        })
        .catch((error) => {
            res.status(403).json({
                message: error.message
            });
        });
}


export function updateProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Please login as administrator to update products",
    });
    return;
  }

  const productId = req.params.productId;
  const newProductData = req.body;

  Product.updateOne(
    { productId: productId },
    newProductData
  )
    .then(() => {
      res.json({
        message: "Product updated",
      });
    })
    .catch((error) => {
      res.status(403).json({
        message: error,
      });
    });
}

export async function getProductById(req,res){

  try{
  const productId = req. params.productId

  const product= await Product.findOne({
    productId:productId
  })
 res.json(product)
}catch(e){
  res.status(500).json({
    e
  })
}



}