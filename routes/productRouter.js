import express from 'express'; // Import Express
import product from '../models/product.js';
import{ createProduct, getProducts,deleteProduct, updateProduct} from '../controllers/productController.js'; // Import the controller functions

const productRouter = express.Router(); // Create a new router for product routes

productRouter.post('/', createProduct); // Define the POST route for creating a product
productRouter.get('/', getProducts); // Define the GET route for fetching products
productRouter.get("/:productId",getProducts);
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId",updateProduct)


export default productRouter; // Export the product routern