const {Schema, model} = require('mongoose');
const emailRegex = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//Schema to create User Model

const userSchema = new Schema(
    {
        username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            //Email Validation
            match:[emailRegex, 'Please provide a valid email address']

        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thoughts',
            },
          ],

          friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
          ]
        },

)

//Virtual
userSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

//Initialze User model
const User = model('user', userSchema);

module.exports = User;