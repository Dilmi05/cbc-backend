import express from 'express'; // Import Express

import { getStudent, createStudent,deleteStudent } from '../controllers/studentController.js'; // Import the controller functions
 
const studentRouter = express.Router(); // Create a new router for student routes

studentRouter.get('/', getStudent) 

studentRouter.post('/', createStudent) 

studentRouter.delete('/',deleteStudent) // Define the DELETE route for deleting a student

// Define the POST route for creating a student
    export default studentRouter; // Export the student router