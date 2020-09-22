const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moment = require('moment');

const getCreatedAt = (createdAt) => {
    return moment(createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a");
}

const reactionsSchema = new Schema({
    reactionId: {
        type: mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        require: true,
        maxLength: 280
    },
    username: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        get: getCreatedAt
    }
}, {
    id: false
});


const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        require: true,
        minlength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: new Date(),
        get: getCreatedAt
    },
    username: {
        type: String,
        require: true
    },
    reactions: {
        type: [reactionsSchema]
    }
}, {
    id: false
});

thoughtsSchema.set('toObject', { getters: true });
thoughtsSchema.set('toJSON', { getters: true });

reactionsSchema.set('toObject', { getters: true });
reactionsSchema.set('toJSON', { getters: true });

thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})



module.exports = mongoose.model('Thought', thoughtsSchema);