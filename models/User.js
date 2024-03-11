const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');


// construct new instance of schema class to define users collection
const userSchema = new mongoose.Schema({
    // define username & email properties
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true }, 
    thoughts: [],
    friends: [],
    
    // TODO
    //  add: , validate: true 
    // ... inside the "}" at end of line 8

    // add 2 subdocuments: thoughts & friends

});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.log(`ERROR, log is from User.js line 17: ${err}`);
User.find({})
    .exec()
    .then(collection => {
        if(collection.length === 0) {
            User.insertMany(
                [
                    {username: 'Yogi', email: 'yogi@gmail.com'},
                    {username: 'Boo Boo', email: 'booboo@gmail.com'},
                    {username: 'Bullwinnkle', email: 'bullwinkle@gmail.com'},
                    {username: 'Rocky', email: 'rocky@gmail.com'},        
                ]
            )
            .catch(err => handleError(err));
        }
    });


module.exports = User;