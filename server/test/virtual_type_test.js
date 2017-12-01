const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', function (done) {
    it('postCount returns number of posts', function (done) {
        const joe = new User({
            firstName: 'Joe',
            lastName: 'Doe',
            posts: [{ title: 'PostTite' }]
        })

        joe.save()
            .then((user) => {
                assert(joe.postCount === 1);
                done();
            });
    });
})