const assert = require('assert');
const User = require('../src/user');

describe('Update Record', function () {

    let user;

    beforeEach(function (done) {
        user = new User({
            firstName: "Frank",
            lastName: "Fichtenmueller"
        })
        user.save().then(() => done());
    });

    // Tests for updating a item in the Collection
    it('Class find by id and update', (done) => {
        User.findByIdAndUpdate(user.id, {
            $set: { firstName: 'Paula' }
        })
            .then(() => User.findById(user.id))
            .then((updUser) => {
                assert(updUser.firstName === 'Paula');
                done();
            })
    });

    it('Class find by attr and update', function (done) {
        User.findOneAndUpdate({ firstName: 'Frank' }, {
            lastName: 'Tester'
        })
            .then(() => User.findById(user.id))
            .then((updUser) => {
                assert(updUser.lastName === 'Tester');
                done();
            });
    });

    it('Instance update', function (done) {
        User.update({ firstName: 'Frank' }, {
            $set: {
                firstName: 'Beeing',
                lastName: 'Tester'
            }
        })
            .then(() => User.findById(user.id))
            // Assert all updates happend
            .then((updUser) => {
                assert(updUser.firstName === 'Beeing'
                    && updUser.lastName === 'Tester');
                done();
            })
    });

    it('Instance update set n save', function (done) {
        user.firstName = 'Beeing';
        user.lastName = 'Tester';
        user.save()
            .then((user) => {
                assert(user.firstName === 'Beeing' && user.lastName === 'Tester');
                done();
            });
    });

    it('Can increment likes on User by 1', function (done) {
        User.update({}, {
            $inc: {
                likes: 1
            }
        })
            .then(() => User.findById(user.id))
            .then((user) => {
                assert(user.likes === 1);
                done();
            })
    });

})