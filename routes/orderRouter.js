 import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js'; // ✅ IMPORT getOrders

const orderRouter = express.Router();

orderRouter.post('/', createOrder);
orderRouter.get('/', getOrders); // ✅ Now this will work

export default orderRouter;
