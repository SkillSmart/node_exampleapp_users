const assert = require('assert');
// import the Models we want to test
const User = require('../src/user');

describe('Creating records', function () {

    // Each It block is ran as a test block
    it('saves a user', function (done) {
        let user = new User({
            firstName: "Frank",
            lastName: "Fichtenmueller"
        });

        user.save()
        .then((user) => {
            assert(!user.isNew);
            done();
        });
    });


});

