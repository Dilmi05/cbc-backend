import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isblocked:{
        type: Boolean,
        default: false
    },
    type:{
        type: String,
        default: 'user'
    },

    profilepicture:{
        type: String,
        default: 'https://wallpaperaccess.com/full/2562964.jpg'
    }

})

const user = mongoose.model("users", userSchema);

export default user;