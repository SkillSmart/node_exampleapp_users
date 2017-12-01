const assert = require('assert');
// Import the necessary model
const User = require('../src/user');
const Post = require('../src/postSchema');

describe('Manage Subdocuments on a Model', function () {

    let user;

    beforeEach(function (done) {
        user = new User({
            firstName: 'John',
            lastName: 'Doe',
            posts: [{ title: 'Post Title' }]
        });
        user.save().then(() => done());
    });

    it('reads a Post from the User Model', function (done) {

        User.findById(user.id)
            .then((user) => {
                assert(user.posts[0].title === 'Post Title');
                done();
            });
    });

    it('adds a new post to the User Model', function (done) {
        const post = {
            title: "My first post"
        };
        User.findById(user.id)
        .then((user) => {
            user.posts.push(post);
            user.save();
        })
        .then(() => User.findById(user.id))
        .then((user) => {
            assert(user.posts[0].title === 'Post Title')
            done();
        });
        
    });
})