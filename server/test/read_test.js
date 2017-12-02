const assert = require('assert');
const User = require('../src/user');

describe('Read Entry from Database', () => {
    // Set the variables we need
    let alex, joe, maria, zach;

    // Set up the initial data within this Test
    beforeEach( function (done) {
        alex = new User({
            firstName: "alex",
            lastName: "Fichtenmueller"
        });
        joe = new User({
            firstName: "joe",
            lastName: "Fichtenmueller"
        });
        maria = new User({
            firstName: "maria",
            lastName: "Fichtenmueller"
        });
        zach = new User({
            firstName: "zach",
            lastName: "Fichtenmueller"
        });
         
        Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
         .then(() => done());
    });

    it('finds all users by firstName', function (done) {
        User.findOne({ firstName: 'zach' })
        .then((user) => {
            assert(user._id.toString() === zach._id.toString());
            done();
        })
    });

    it('can skip and limit the result set', function (done) {
        User.find()
        // Dei
        .sort({firstName: 1})
        .skip(1)
        .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].firstName === 'joe');
                assert(users[1].firstName === 'maria');
                done();
            })
    })

});
