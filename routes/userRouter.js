import express from 'express'; // Import Express

const userRouter = express.Router(); // Create a new router for user routes

import { createUser, loginuser } from '../controllers/userController.js'; // Import the controller function
import user from '../models/user.js';

userRouter.post('/', createUser); // Define the POST route for creating a user

userRouter.post('/login',loginuser); // Define the POST route for user login

export default userRouter; // Export the user router