import Product from '../models/product.js';
import { isAdmin } from './userController.js'; // Importing isAdmin function for admin check

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
