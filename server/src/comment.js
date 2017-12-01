const mongoose = require('mongoose');
const {Schema} = mongoose;

// import related Schema and Models
const User = require('./user');

const CommentSchema = new Schema({
    title: {type: String},
    body: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'user'}
});

// define virtual types

// define .pre and .post Middleware hooks
CommentSchema.pre('remove', function(next) {
    const Comment = mongoose.model('comment');

    Comment.remove({ id: { $in: this.comments}})
        .then(() => next());
});

// export the Model
module.exports = mongoose.model('comment', CommentSchema );