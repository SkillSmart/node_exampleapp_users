const mongoose = require('mongoose');
const { Schema } = mongoose;

// import nested Schemas and Models
const Comment = require('./comment');
const User = require('./user');

const BlogPostSchema = new Schema({
    title: { type: String, default: '' },
    body: { type: String, default: '' },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    // Meta information
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, default: Date.now() },
    lastModified: { type: Date, default: Date.now() }
})

// Define virtual types on the Schema
BlogPostSchema.virtual('numComments').get(function () {
    return this.comments.length;
});

module.exports = mongoose.model('blogPost', BlogPostSchema);