let mongoose = require('mongoose');

// Set up a test connection to the Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test_users', { useMongoClient: true });
mongoose.connection
    .once('openUri', () => console.log("Good to go"))
    .on('error', (err) => console.log(err));

// Define Hooks to execute Maintainance code for the TestSuite

// // Will run before each test
// beforeEach((done) => {
//     mongoose.connection.collections.users.drop(() => {
//         // Ready to tun the next test!
//         done();
//     });
// });

beforeEach(function (done) {
    mongoose.connection.collections.users.drop(() => {
        done();
    })
});


