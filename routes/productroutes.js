import express from 'express'; // Import Express

import { getProduct, createProduct, deleteProduct,getproductbyname } from '../controllers/productController.js'; // Import the controller functions

const productRouter = express.Router(); // Create a new router for product routes

productRouter.get('/', getProduct); // Define the GET route for fetching products
productRouter.get('/:name', getproductbyname); // Define the GET route for fetching a product by name
productRouter.post('/', createProduct); // Define the POST route for creating a product


productRouter.delete('/:name', deleteProduct); // Define the DELETE route for deleting a product


export default productRouter; // Export the product router