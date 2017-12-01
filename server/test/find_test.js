const assert = require('assert');
const User = require('../src/user');

describe('Read Entry from Database', () => {
    // Set the variables we need
    let user;

    // Set up the initial data within this Test
    beforeEach( function (done) {
        user = new User({
            firstName: "Frank",
            lastName: "Fichtenmueller"
        });
         user.save()
         .then(() => done());
    });

    it('finds all users by firstName', function (done) {
        User.findOne({ firstName: 'Frank' })
        .then((user) => {
            assert(user._id.toString() === user._id.toString());
            done();
        })
    });

});
