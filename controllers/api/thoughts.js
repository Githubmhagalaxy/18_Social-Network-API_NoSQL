const {Thought, User} = require('../../models');

module.exports = {
    getAllThoughts: async (req, res) => {
        try {
            const results = await Thought.find();
            res.status(200).json(results);
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            })
        }
    },
    postAddNewThought: async (req, res) => {
        try {
            const {userId} = req.body;
            let thought = new Thought(req.body);
            let user = await User.findById(userId);
            if (user) {
                user.thoughts.push(thought._id);
                await user.save();
                const result = await thought.save();
                res.status(201).json(result);
            } else {
                throw new Error(`user with _id: ${userId} could not be found`);
            }
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            })
        }
    },
    getSingleThought: async (req, res) => {
        try {
            const result = await Thought.findById(req.params.id);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            })
        }
    },
    putUpdateAThought: async (req, res) => {
        try {
            const result = await Thought.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            res.status(201).json(result);
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            })
        }
    },
    deleteAThought: async (req, res) => {
        try {
            const result = await Thought.findByIdAndDelete(req.params.id);
            res.status(201).json(result);
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            })
        }
    },
    postAddNewReaction: async (req, res) => {
        try {
            // let reaction = new Reaction(req.body);
            let user = await User.findOne({
                username: req.body.username
            });
            let thought = await Thought.findById(req.params.thoughtId);
            if(user && thought) {
                thought.reactions.push({...req.body});
                const result = await thought.save();
                res.status(201).json(result);
            } else {
                throw new Error('user or thought could not be found');
            }
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            })
        }
    },
    deleteAReaction: async (req, res) => {
        try {
            const {thoughtId, reactionId} = req.params;
            let thought = await Thought.findById(thoughtId);
            thought.reactions = thought.reactions.filter(reaction => {
                return (reactionId != reaction.reactionId)
            });
            const result = await thought.save();
            res.status(201).json(result);
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            })
        }
    },
}