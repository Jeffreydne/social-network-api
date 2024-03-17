const express = require('express');
const db = require('./config/connection');

// require models
const { User, Thought } = require('./models');
// XXXXXXX might be able to delete line 7 XXXXXXXXXX
const { reactionSchema } = require('./models/Thought.js');

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
// find one user from the id, then populate the  user.thoughts array, then send back the user data
app.get('/findUser/:id', async (req, res) => {
    try {
        const result = await User.findOne({_id: req.params.id})
        .select('-__v')
        .populate('thoughts');
        res.status(200).json(result);
    } catch (err) {
        console.log(`ERROR from server.js line 26 ${err}`);
        res.status(500).json({ message: 'Something is wrong in User.findOne() inserver.js'});
    }
});

// Create a new user
app.post('/newUser', async (req,res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email
    });
    await newUser.save();
    if (newUser) {
        res.status(200).json(newUser);
    } else {
        console.log(`Error: line 37 in server.js`);
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
});

// delete user based on user id
app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(`${req.params.id}`);
    res.status(200).json(result);
    console.log(`Deleted: ${result}`);
    } catch (err) {
        console.log('Uh Oh, something went wrong line 55 imdex.js app.delete');
        res.status(500).json({ message: 'something went wrong with delete' });
    }
});

// update user info using user id
app.put('/updateUser/:id', async (req, res) => {
    try {
      const result = await User.findByIdAndUpdate(
        `${req.params.id}` , {username: req.body.username, email: req.body.email}, {new:true});
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong with line 67 (app.put)');
      res.status(500).json({ error: 'Something went wrong with update' });
    }
});

// add a friend
app.post('/newFriend/user/:userId/:friendId', 
 async (req, res) => {
    try {
        let user = await User.findOne({_id: req.params.userId});
        user.friends.push(req.params.friendId);
        await user.save();
        res.status(200).send("Friend added.")
    } catch (err) {
        console.log(`ERROR from server.js line 81 ${err}`);
        res.status(500).json({ message: 'Something is wrong in post newFriend in server.js'});
    }
 });

 // delete a friend
 app.delete('/deleteFriend/user/:userId/:friendId', 
 async (req, res) => {
    try {
        let user = await User.findOne({_id: req.params.userId});
        // delete function here
        
        // user.friends.push(req.params.friendId);
        await user.save();
        res.status(200).send("Friend deleted.")
    } catch (err) {
        console.log(`ERROR from server.js line 97 ${err}`);
        res.status(500).json({ message: 'Something is wrong in post newFriend in server.js'});
    }
 });

// find all thoughts
app.get('/thoughts',
async (req, res) => {
    try {
        const userData = await Thought.find.populate('reactions');
        // added.populate and removed: ({});
        
        res.status(200).json(userData);
    } catch (err) {
        console.log(`ERROR from server.js line 78 ${err}`);
        res.status(500).json({ message: 'Something is wrong in Thought.find() for thoughts in server.js'});
    }
});

// find one thought
app.get('/findThought/:id', async (req, res) => {
    try {
        const result = await Thought.findById(`${req.params.id}`);
        res.status(200).json(result);
    } catch (err) {
        console.log(`ERROR from server.js line 90 ${err}`);
        res.status(500).json({ message: 'Something is wrong in Thought.findOne() inserver.js'});
    }
});

// Create a new thought
// 1st find the user

app.post('/newThought', async (req,res) => {
    let user = await User.findOne({username: req.body.username});
    if(user) {
        // console.log(user);
    const newThought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
    })
    // .populate('thoughts');
    // console.log(user.thoughts);
    user.thoughts.push(newThought);
    await user.save();
    res.status(200).json(newThought);
    } else {
        console.log(`Error: line 102 in server.js`);
        res.status(404).json({
            message: 'Something went wrong, User not found'
        });
    }
});

// update a thought based on thought id
app.put('/updateThought/:id', async (req, res) => {
    try {
      const result = await Thought.findByIdAndUpdate(
        `${req.params.id}` , {username: req.body.username, thoughtText: req.body.thoughtText}, {new:true});
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong with line 120 (app.put)');
      res.status(500).json({ error: 'Something went wrong with thought update' });
    }
});
// delete a thought based on thought id
app.delete('/deleteThought/:id', async (req, res) => {
    try {
        const result = await Thought.findByIdAndDelete(`${req.params.id}`);
    res.status(200).json(result);
    console.log(`Deleted: ${result}`);
    } catch (err) {
        console.log('Uh Oh, something went wrong line 132 server.js thought.delete');
        res.status(500).json({ message: 'something went wrong with thought delete' });
    }
});

// add a reaction
app.post('/newReaction/:thoughtId/',  
 async (req, res) => {
    const { reactionBody, username } = req.body;
    console.log({ reactionBody, username });
    try {
        let thought = await Thought.findById(`${req.params.thoughtId}`);
        console.log(thought);
        // let newReaction = new reactionSchema({
        //     reactionBody: req.body.reactionBody,
        //     username: req.body.username
        // });
            // console.log({newReaction});
        // await newReaction.save();
        thought.reactions.push({ reactionBody, username });
        await thought.save();
        res.status(201).json(thought);
        // send("Reaction added.");
    } catch (err) {
        console.log('Uh Oh, something went wrong line 170 server.js adding a reaction');
        res.status(500).json({ message: 'something went wrong with adding the reaction' });
    }
 });
// once db is open then activate listener for server for app and log to console the port that server is running on
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
