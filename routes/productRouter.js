import express from 'express'; // Import Express
import product from '../models/product.js';
import{ createProduct, getProducts,deleteProduct} from '../controllers/productController.js'; // Import the controller functions

const productRouter = express.Router(); // Create a new router for product routes

productRouter.post('/', createProduct); // Define the POST route for creating a product
productRouter.get('/', getProducts); // Define the GET route for fetching products
productRouter.delete("/:productId",deleteProduct)


export default productRouter; // Export the product router