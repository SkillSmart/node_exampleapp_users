const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Middleware for cleanup', function () {

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


    it('removing blogPost removes associated comments', function (done) {
        blogPost.remove()
            .then(() => {
                BlogPost.count()
                    .then((count) => {
                        assert(count === 0);
                        done();
                    });
            });
    });
})
