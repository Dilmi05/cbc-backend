import user from '../models/user.js'; // Import the user model

import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation

import dotenv from 'dotenv'; // Import dotenv for environment variables
dotenv.config(); // Load environment variables from .env file
export function createUser(req, res) {

    const newuserdata = req.body; // Get user data from the request body

    if(newuserdata.type=="admin"){

        if(req.user == null){
            res.json({
                message:"Please loging as administrator to create an admin account"
            })
            return;


        }

        if(req.user.type != "admin"){
            res.json({
                message:"Please login as administrator to create an admin account"
            })
            return;

        }

    }

    newuserdata.password = bcrypt.hashSync(newuserdata.password, 10); // Hash the password

    const newUser = new user(newuserdata); // Create a new user instance with the request body
    newUser.save() // Save the new user to the database
        .then(() => {
            res.json({ message: 'User created successfully' }); // Respond with success message
        })
        .catch((err) => {
            res.json({ 
                
                message:"Error creating user",
            }); // Handle errors
        });

    }

    export function loginuser(req,res){
        user.find({email:req.body.email}).then((userList) => {

            if(userList.length==0){
                res.json({
                    message: 'User not found',
                });
            }else{
                const user = userList[0]; // Get the first user from the list
                const isPasswordValid = bcrypt.compareSync(req.body.password, user.password); // Compare the provided password with the stored hashed password

                if(isPasswordValid){
                  const token =   jwt.sign({email: user.email,
                    fillname: user.firstname,
                    lastname: user.lastname,
                    isblocked: user.isblocked,
                    type: user.type,
                    profile: user.profile,

                  },process.env.SECRET)
                    res.json({
                        message: "Login successful",
                        token: token, // Respond with the generated token
                    });
                }else{
                    res.json({
                        message:"Invalid password",
                    })
                }


            }

        })
    }  


    export function deleteuser(req,res){
        user.deleteOne({email:req.body.email}).then(() => {
            res.json({
                message: 'User deleted successfully',
            });
        })
    }


    export function isAdmin(req){
    if(req.user == null){
        return false;
    }
    if(req.user.type != "customer"){
        return false;
    }
    return true;
}



 