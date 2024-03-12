const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

// schema instance for reaction subdocument for thoughts
const reactionSchema = new Schema({
    // reactionId: { type: Schema.Types.ObjectId, 
    // default: mongoose.Types.ObjectId,
    // },
    reactionBody: { type: String, required: true, maxLength: 280 },
    // username: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
});

// schema for thoughts document
const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 }, 
    createdOn: { type: Date, default: Date.now },
    // username: { type: String, required: true }, 
    reactions: [reactionSchema],
});

const Thought = model('Thought', thoughtSchema);


module.exports = {Thought, thoughtSchema };