const mongoose = require('mongoose');

// Set up a test connection to the Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test_users', { useMongoClient: true });
mongoose.connection
    .once('openUri', () => console.log("Good to go"))
    .on('error', (err) => console.log(err));

// Define Hooks to execute Maintainance code for the TestSuite

// Before we run each test, we want to clean out all created collections, 
// so we can start with a clean database
beforeEach( (done) => {
    const { users, comments, blogposts} = mongoose.connection.collections;
    // We can not drop multiple collections at once, so we have to sequentially
    // drop them one collection at a time
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});


