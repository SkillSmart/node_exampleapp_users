const mongoose = require('mongoose');
const PostSchema = require('./postSchema');

module.exports = mongoose.model("User", {
    firstName: { 
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required.'], 
    },
    lastName: { 
        type: String, 
        required: [true, 'Last Name is required.'] 
    },
    postCount: { type: Number, default: 0 },
    posts:{
        type: [PostSchema],
        default: [],
    }
})