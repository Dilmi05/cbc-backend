import express from 'express';
import { createOrder} from '../controllers/orderController.js'; // ✅ IMPORT getOrders

const orderRouter = express.Router();

orderRouter.post('/', createOrder);
// orderRouter.get('/', getOrders); // 

export default orderRouter;
