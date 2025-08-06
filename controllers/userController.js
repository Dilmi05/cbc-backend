import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Create a new user
export function createUser(req, res) {
    const data = req.body;
     
    // Only admin can create another admin
    if (data.type === "admin") {
        if (!req.user || req.user.type !== "admin") {
            return res.json({
                message: "Please login as administrator to create an admin account"
            });
        }
    }

    // Hash the password
    data.password = bcrypt.hashSync(data.password, 10);

    const newUser = new User(data);
    newUser.save()
        .then(() => res.json({ message: 'User created successfully' }))
        .catch((err) => res.json({ message: "Error creating user", error: err.message }));
}

// Login user and return token
export function loginuser(req, res) {
    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.json({ message: 'User not found' });
            }

            const isValid = bcrypt.compareSync(password, user.password);
            if (!isValid) {
                return res.json({ message: "Invalid password" });
            }

            const token = jwt.sign({
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                isblocked: user.isblocked,
                type: user.type,
                profile: user.profile,
            }, process.env.SECRET, { expiresIn: '1h' });

            res.json({ message: "Login successful", token });
        })
        .catch((err) => res.json({ message: "Login failed", error: err.message }));
}

// Delete user by email
export function deleteuser(req, res) {
    User.deleteOne({ email: req.body.email })
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch((err) => res.json({ message: 'Error deleting user', error: err.message }));
}

// Check if user is admin
export function isAdmin(req) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

        if (!token) return false;

        const decoded = jwt.verify(token, process.env.SECRET); // Verify token using secret
        
        return decoded.type === "admin";
        
    } catch (err) {
        return false;
    }
}

// In userController.js
 
 
// Check if user is customer
export function isCustomer(req) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Get token from Bearer <token>

        if (!token) return false;

        const decoded = jwt.verify(token, process.env.SECRET); // Verify token using secret

        return decoded.type === "user"; // 'user' means customer in your app
    } catch (err) {
        return false;
    }
}

/*export function isCustomer(req) {
    if(req.user == null) {
        return false; // No user is logged in
    }

    if(req.user.type != "customer") {
        return false; // User is a customer
    }
 
    return true; // User is a customer
}*/


