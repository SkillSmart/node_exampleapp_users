const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', function () {

    let user;

    beforeEach( function (done) {
        user = new User({
            firstName: "Frank",
            lastName: "Fichtenmueller"
        })
        user.save().then(() => done());
    });

    it('model instance remove', function (done) {
        user.remove()
            .then(() => User.findOne({ name: 'Frank' }))
            .then((user) => {
                assert(user === null);
                done();
            })
    });

    it('class method remove', function (done) {
        User.remove()
            .then(() => User.findOne({ name: 'Frank' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findByIDAndremove', function (done) {
        User.findByIdAndRemove(user.id)
            .then(() => User.findById(user.id))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findOneAndRemove', function (done) {
        User.findOneAndRemove({ firstName: "Frank" })
            .then(() => User.findOne({ firstName: "Frank" }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});
