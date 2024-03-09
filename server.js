const express = require('express');
const db = require('./config/connection');

// require models
const { User } = require('./models');

const PORT = process.env.PORT || 3015
// set up app variable to be an instance of express, using the methods below
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('users',
async (req, res) => {
    try {
        const userData = await User.find({});
        res.status(200).json(userData);
    } catch (err) {
        console.log(`ERROR from server.js line 19 ${err}`);
        res.status(500).json({ message: 'Something is worng in User.find() inserver.js'});
    }
})

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
