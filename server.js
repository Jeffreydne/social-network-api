const express = require('express');
const db = require('./config/connection');

// const ObjectId = require('mongodb');
// require models
const { User, Thought } = require('./models');

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
// find one user
app.get('/findUser/:id', async (req, res) => {
    try {
        const result = await User.findById(`${req.params.id}`);
        res.status(200).json(result);
    } catch (err) {
        console.log(`ERROR from server.js line 26 ${err}`);
        res.status(500).json({ message: 'Something is wrong in User.findOne() inserver.js'});
    }
})
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

// delete user based on username
//  TODO change search criteria to _id
app.delete('/delete', async (req, res) => {
    try {
        const result = await User.findOneAndDelete({ username: req.body.username });
    res.status(200).json(result);
    console.log(`Deleted: ${result}`);
    } catch (err) {
        console.log('Uh Oh, something went wrong line 55 imdex.js app.delete');
        res.status(500).json({ message: 'something went wrong with delete' });
    }
});

// update user info
// TODO change search criteria to _id
app.put('/updateUser/:userName', async (req, res) => {
    try {
      const result = await User.findOneAndUpdate(
        {
        username: req.params.userName 
      }, {username: req.body.username, email: req.body.email}, {new:true});
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong with line 69 (app.put)');
      res.status(500).json({ error: 'Something went wrong with update' });
    }
});

// find all thoughts
app.get('/thoughts',
async (req, res) => {
    try {
        const userData = await Thought.find({});
        res.status(200).json(userData);
    } catch (err) {
        console.log(`ERROR from server.js line 84 ${err}`);
        res.status(500).json({ message: 'Something is wrong in User.find() for thoughts in server.js'});
    }
});

// once db is open then activate listener for server for app and log to console the port that server is running on
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
