const express = require('express');
const db = require('./config/connection');

// require models
const { User } = require('./models');

const PORT = process.env.PORT || 3015
// set up app variable to be an instance of express, using the methods below
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// find all users
app.get('/users',
async (req, res) => {
    try {
        const userData = await User.find({});
        res.status(200).json(userData);
    } catch (err) {
        console.log(`ERROR from server.js line 19 ${err}`);
        res.status(500).json({ message: 'Something is wrong in User.find() inserver.js'});
    }
});
// Create a new user
app.post('/newUser', (req,res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email
    });
    newUser.save();
    if (newUser) {
        res.status(200).json(newUser);
    } else {
        console.log(`Error: line 35 in server.js`);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
