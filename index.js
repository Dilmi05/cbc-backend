// index.js
import express from 'express'; // Import Express

import bodyParser from 'body-parser';  

import mongoose from 'mongoose'; // Import Mongoose

  const app = express();  



import userRouter from './routes/userRouter.js'; // Import the user routes

import dotenv from "dotenv"; // Import dotenv for environment variables
dotenv.config() // Load environment variables from .env file

import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation
const mongodbUrl= process.env.MONGO_DB_URI// Create Express app




app.use(bodyParser.json()); // Middleware to parse JSON bodies

app.use((req,res,next) => {
 

  const token =req.header('authorization')?.replace("Bearer","") // Log the authorization header

   

  if(token!= null){
    jwt.verify(token,process.env.SECRET,(err,decoded)=>{
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

 
 app.use('/api/users', userRouter); // Use the user router for /users routes
// Start the server
app.listen(PORT, () => {
  console.log("Server is running at http://localhost:${PORT}");
});
 