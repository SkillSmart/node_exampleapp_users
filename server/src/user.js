const mongoose = require('mongoose');
const { Schema } = mongoose;
const PostSchema = require('./postSchema');
const BlogPost = require('./blogPost');

// Define the Schema to describe and validate the Data in the Model
const UserSchema = new Schema({
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
    // Definition of a subcollection
    posts: {
        type: [PostSchema],
        default: [],
    },
    // Def: Association to Model
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }],
    likes: { type: Number, default: 0 }
});

// Here we define the virtual fields on the Schema
// they are available on the instance, but are not 
// persisted in the DB
UserSchema.virtual('postCount').get(function () {
    return this.posts.length;
});
UserSchema.virtual('blogPostCount').get(function () {
    return this.blogPosts.length;
});

// MIDDLEWARE: Set either .pre  or .post on a given Event type
UserSchema.pre('remove', function (next) {
    // To prevent circulare requires in the files, we require
    // exising models directly in this function scope
    const BlogPost = mongoose.model('blogPost');

    // Apply cleanup 
    BlogPost.remove({ id: { $in: this.blogPosts } })
        .then(() => next());
});

module.exports = mongoose.model('user', UserSchema);

