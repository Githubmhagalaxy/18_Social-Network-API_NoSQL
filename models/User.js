const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Email is not valid! please provide a valid one...']
    },
    thoughts: [
        {type: mongoose.Types.ObjectId, ref: 'Thought'}
    ],
    // friends: [
    //     {type: Schema.Types.ObjectId, ref: 'User'}
    // ]
    friends: [this]
}, {
    timestamps: false,
    id: false
});

userSchema.set('toObject', { getters: true });
userSchema.set('toJSON', { getters: true });

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

module.exports = mongoose.model('user', userSchema)