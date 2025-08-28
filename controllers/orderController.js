import Order from "../models/order.js";
import product from "../models/product.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req, res) {
    if (!isCustomer(req)) {
        return res.json({
            message: "Please login as customer to create an order"
        });
    }

    try {
        const latestOrder = await Order.find().sort({ date: -1 }).limit(1);

        let orderId;

        if (latestOrder.length === 0) {
            orderId = "CBC0001";
        } else {
            const currentOrderId = latestOrder[0].orderId;
            const numberString = currentOrderId.replace("CBC", "");
            const number = parseInt(numberString);
            const newNumber = (number + 1).toString().padStart(4, "0");
            orderId = "CBC" + newNumber;
        }

        const newOrderData = req.body;
        const newProductArray = [];

        for (let i = 0; i < newOrderData.orderedItems.length; i++) {
            const orderedItem = newOrderData.orderedItems[i];

            // ✅ Normalize key from either productID or productId
            const productID = orderedItem.productID || orderedItem.productId;

            const foundProduct = await product.findOne({
                productID: productID // ✅ Use correct field name from DB
            });

            if (!foundProduct) {
                return res.status(404).json({
                    message: `Product with ID ${productID} not found`
                });
            }

            // ✅ Push the required info into the array, using correct field names
            newProductArray.push({
                name: foundProduct.productName,
                price: foundProduct.price,
                quantity: orderedItem.quantity,
                image: foundProduct.images[0] || "" // ✅ Handle missing image gracefully
            });
        }

        // ✅ Fill in required order schema fields
        newOrderData.orderedItems = newProductArray;
        newOrderData.orderId = orderId;
        newOrderData.email = req.user?.email || "guest@example.com";
        newOrderData.name = req.body.name || "Guest User";
        newOrderData.address = req.body.address || "N/A";
        newOrderData.phone = req.body.phone || "0000000000";

        const newOrder = new Order(newOrderData);
        const result = await newOrder.save();

        res.json({
            message: "Order created successfully",
            data: result
        });

    } catch (err) {
        console.error("Order Creation Error:", err);
        res.status(500).json({
            message: "Error creating order",
            error: err.message
        });
    }
}
