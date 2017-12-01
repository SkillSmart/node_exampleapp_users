const _ = require('lodash');
const { ObjectID } = require('mongoose');
// Import Models
const User = require('../src/user');



module.exports = function (app) {

    // Returns a list of all users
    app.get("/api/users", async (req, res) => {
        // Collect data from db
        let users = await User.find();
        res.send(users);
    });

    // Creates a new user in the DB
    app.post("/api/users", async (req, res) => {
        let body = _.pick(req.body, [
            'firstName',
            'lastName'
        ]);

        let user = new User({
            ...req.body
        });
        if (!user) {
            return res.status(400).send("User could not be created");
        }
        user = await user.save().catch((err) => res.status(400).send(err));
        res.send(user);
    });

    // Displays an individual user
    app.get("/api/users/:userId", async (req, res) => {
        console.log(req.params);
        // Check if id is a valid id
        // if(!ObjectID.isValid(req.body.id)){
        //     res.status(500).send("Not a valid UserID");
        // }
        let user = await User.findById(req.params.userId, (err, user) => {
            if (err) throw err;
        });
        res.send(user);
    });

    // Update an individual User
    app.patch("/api/users/:userId", async (req, res) => {

        let body = _.pick(req.body, [
            'firstName',
            'lastName',
        ]);
        let user = await User.findOneAndUpdate(req.params.userId, {
            $set: {
                ...body
            },
        }, { new: true },
            (err, user) => {
                if (err) return res.status(400).send(err);
                res.send(user);                
            });
    });

    // Delete an entry
    app.delete("/api/users/:userId", async (req, res) => {
        User.findByIdAndRemove(req.params.userId, (err, user) => {
            if(err) return res.status(400).send(err);
            res.send(user);
        })
    })

};