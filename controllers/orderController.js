import order from "../models/order.js";
import product from "../models/product.js";

import{isCustomer} from "./userController.js"; // Importing isCustomer function for customer check

export  async function createOrder(req, res) {

    if (!isCustomer(req)) {
        return res.json({
            message: "Please login as customer to create an order"
        });
    }


  try{
    
    const latestOrder = await order.find().sort({date:-1}).limit(1);

    let orderId 

    if(latestOrder.length == 0) {
        orderId = "CBC0001";
    }else{
        const currentOrderId = latestOrder[0].orderId;

        const numberString = currentOrderId.replace("CBC", ""); 
        const number = parseInt(numberString);

        const newNumber =(number +1 ).toString().padStart(4, "0");
        
        orderId = "CBC" + newNumber;

    }

    

    const newOrderData =req.body;

    const newProductArray=[];

    for(let i=0; i<newOrderData.orderedItems.length;i++){
        const Product = await order.findOne({
            productId: newOrderData.orderedItems[i].productId
        })

        if(Product== null) {
            return res.json({
                message: "Product with ID "+newOrderData.orderedItems[i].productId+"not found"
            });
        }

         newProductArray[i] ={
            name:product.productName,
            price:product.price,
            quantity:newOrderData.orderedItems[i].quantity,
            image:product.image[0]
        }

       
    }

    console.log(newProductArray);

    newOrderData.orderedItems = newProductArray;


     


    newOrderData.orderId = orderId;
    newOrderData.email = req.user.email;
    
    const newOrder = new order(newOrderData);
    await newOrder.save();
    res.json({
        message: "Order created successfully",
     });

 
  
  }catch(err) {
    res.status(500).json({
      message: "Error creating order",
  })


}
}
 
export async function getOrders(req, res) {
  try {
    const orders = await order.find(); // use your model
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
}
