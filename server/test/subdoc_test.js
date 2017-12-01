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
                // Need to return form function to return the 
                // promise, to be able to chain on other commands
                return user.save()
                    .then(() => User.findById(user.id))
                    .then((user) => {
                        assert(user.posts[1].title === 'My first post');
                        done();
                    })
            })
    });

    it('can remove an existing subdocument', function () {
        // Add a subdocument to the user
        user.posts.push({title: 'First testpost'});
        user.save()
            .then(() => User.findById(user.id))
            .then((user) => {
                user.posts[0].remove();
                return user.save();
            })
            .then((user) => {
                assert(user.posts[0] === null);
                done();
            })
    })

})