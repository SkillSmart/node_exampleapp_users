const assert = require('assert');

const User = require('../src/user');

describe('Validating records', function () {
    it('requires a user name', () => {
        const user = new User({
            firstName: undefined,
            lastName: 'Fuchtler'
        });
        const validationResult = user.validateSync();
        // console.log(validationResult);
        const { message } = validationResult.errors.firstName;
        assert(message === 'Name is required.');
    });

    it('requires a users\'s name of at least length 2', () => {
        const user = new User({
            firstName: 'Al',
            lastName: 'Fuchtler'
        });
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.firstName;
        assert(message === 'Name must be longer than 2 characters.');
    });

    it('disallows invalid records from beeing saved', function (done) {
        const user = new User({
            firstName: 'Al',
            lastName: undefined,
        });
        user.save()
            .catch((validationResult) => {
                // Catch multiple Error Messages coming in at once
                err_firstName = validationResult.errors.firstName.message;
                err_lastName = validationResult.errors.lastName.message;
                // Assert them all
                assert(
                    err_lastName === 'Last Name is required.' && 
                    err_firstName === 'Name must be longer than 2 characters.'
                );
                // Return to main
                done();
            });
    })
});