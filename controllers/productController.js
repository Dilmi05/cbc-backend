import product from "../models/product.js";  

import{ isAdmin } from "./userController.js"; // Import the isAdmin function

export function createProduct(req, res) {

   if(!isAdmin(req)) {
       res.json({
        message:"Please login as administrator to add products"
       })


   }
     

        const newProductData = req.body; // Get product data from the request body

        const newProduct = new product(newProductData); // Create a new product instance with the request body
        newProduct.save() // Save the new product to the database
            .then(() => {
                res.json({ message: 'Product created successfully' }); // Respond with success message
            })
            .catch((err) => {
                res.json({ 
                    message: err
                }); // Handle errors
            });
    }

    export function getProducts(req, res) {
        product.find({}).then((products) => {
            res.json(products); // Respond with the list of products
        }) 
    }





