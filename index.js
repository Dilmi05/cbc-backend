// index.js
import express from 'express'; // Import Express

import bodyParser from 'body-parser';  

import mongoose from 'mongoose'; // Import Mongoose

import student from './models/student.js'; // Import the student model
  // Import Express

import studentRouter from './routes/studentroutes.js'; // Import the student routes

import productRouter from './routes/productroutes.js'; // Import the product routes
 const app = express();  

import userRouter from './routes/userRouter.js'; // Import the user routes

import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation
const mongodbUrl= "mongodb+srv://amandhadilmi:123@cluster0.fdmqznf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"// Create Express app




app.use(bodyParser.json()); // Middleware to parse JSON bodies

app.use((req,res,next) => {
 

  const token =req.header('authorization')?.replace("Bearer","") // Log the authorization header

   

  if(token!= null){
    jwt.verify(token,"ama610156",(err,decoded)=>{
      if(!err){

        console.log(decoded); // Log the decoded token
        req.user = decoded; // Attach the decoded user information to the request object
        
      }
      })

  }
   next(); // Call the next middleware
}
)

mongoose.connect(mongodbUrl,{})

const connection = mongoose.connection; // Create a connection to MongoDB
connection.once("open",() => {
    console.log("MongoDB connection established successfully");
});

const PORT = 5000;

 app.use('/api/students', studentRouter); // Use the student router for /students routes
 app.use('/api/products', productRouter);
  // Use the product router for /products routes

 app.use('/api/users', userRouter); // Use the user router for /users routes
// Start the server
app.listen(PORT, () => {
  console.log("Server is running at http://localhost:${PORT}");
});
 