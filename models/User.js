const mongoose = require('mongoose');


// construct new instance of schema class to define users collection
const userSchema = new mongoose.Schema({
    // define username & email properties
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, validate: true }, 
    
    // TODO
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
                    {userName: 'Yogi', email: 'yogi@gmail.com'},
                    {userName: 'Boo Boo', email: 'booboo@gmail.com'},
                    {userName: 'Bullwinnkle', email: 'bullwinkle@gmail.com'},
                    {userName: 'Rocky', email: 'rocky@gmail.com'},        
                ]
            )
            .catch(err => handleError(err));
        }
    });


module.exports = User;