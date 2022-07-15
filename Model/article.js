const mongoose= require('mongoose');

const articleSchema= new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    objectId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: "Title is required",
        unique: "Title must be unique",
    },
    content: {
        type: String,
        required: "Content is required",
        unique: "Content must be unique",
    },
}); 

let Article= mongoose.model("Article", articleSchema);
module.exports= Article;