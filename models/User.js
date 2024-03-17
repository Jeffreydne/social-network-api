// const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
// const  {thoughtSchema} = require('./Thought.js')


// construct new instance of schema class to define users collection
const userSchema = new Schema({
    // define username & email properties
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true }, 
    thoughts: [
        { type: Schema.Types.ObjectId,
        ref: 'Thought' }
    ],

    friends: [
        { type: Schema.Types.ObjectId,
            ref: 'User' }
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false, 

}
);
// create virtual property of friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


const User = model('User', userSchema);

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