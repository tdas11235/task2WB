const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        unique: "Username must be unique",
        required: "Username is required",
    },
    email: {
        type: String,
        unique: "Email must be unique",
        required: "Email is required",
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "fill a valid email address"],
    },
    password: {
        type: String,
        required: "Password is required",
    },
});

let User= mongoose.model("User", userSchema);
module.exports = User;