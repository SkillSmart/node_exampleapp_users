const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associate Collections', function () {
    let user, blogPost, comment;

    beforeEach((done) => {
        // We initialize all types of Models
        user = new User({
            firstName: 'Joe',
            lastName: 'Doe',
            blogPosts: []
        });
        blogPost = new BlogPost({
            title: "My first blog",
        });
        comment = new Comment({
            title: 'Congrats on a great post',
            body: 'Wow, really nicely done job here!'
        });
        // Associate the Models
        user.blogPosts.push(blogPost);
        blogPost.author = user;
        comment.user = user;
        blogPost.comments.push(comment);
        // Save all Models in a single 'contained' promise
        Promise.all([user.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('stores a blogPost on the User', function (done) {
        User.findById(user.id)
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'My first blog');
                done();
            })
    })

    it('saves a full relation graph', function (done) {
        User.findById(user.id)
        .populate({
            // Define the part of the resulting model to populate
            path:'blogPosts', 
            // Define a nested path to populate
            populate: {
                // define the name of the attribute to populate
                path: 'comments',
                // specify the Model we expect to get back from 
                // the sub population query
                model: 'comment',
                // Dig one level deeper to retrieve the comment author
                populate: {
                    path: 'user',
                    model: 'user'
                }
            }
        })
        .then((user) => {
            assert(user.firstName === 'Joe');
            assert(user.lastName === 'Doe');
            assert(user.blogPosts[0].title === "My first blog")
            assert(user.blogPosts[0].comments[0].title = "Congrats on a great post")
            assert(user.blogPosts[0].comments[0].body = "Wow, really nicely done job here!")
            assert(user.blogPosts[0].comments[0].user.firstName === 'Joe');
            assert(user.blogPosts[0].comments[0].user.blogPostCount === 1);
            done();
        })
    })
})