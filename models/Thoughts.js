const {Schema, model} = require('mongoose');

const reactionSchema = require('./Reaction')

const moment = require('moment');

//Schema to create Thought Model

const thoughtSchema = new Schema(
    {
       thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
       },

       createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a'),
       },

       username: {
        type: String,
        required: true,
       },

       reactions:[reactionSchema]

    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})
//Initialze User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;