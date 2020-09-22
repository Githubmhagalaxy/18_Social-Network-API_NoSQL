const {User} = require('../../models');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users)
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            });
        }
    },
    postNewUser: async (req, res) => {
        try {
            const newUser = new User(req.body);
            const result = await newUser.save()
            res.status(201).json(result)
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            })
        }
    },
    getSingleUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
            res.status(200).json(user);
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            })
        }
    },
    putUpdateAUser: async (req, res) =>{
        try {
            const result = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            res.status(201).json(result)
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            })
        }
    },
    deleteAUser: async (req, res) =>{
        try {
            const result = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            })
        }
    },
    postAddNewFriend: async (req, res) =>{
        try {
            const {userId, friendId} = req.params;
            let user = await User.findById(userId);
            if(user) {
                user.friends.push(friendId);
            }
            const result = await user.save();
            res.status(201).json(result)
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            })
        }
    },
    deleteAFriend: async (req, res) =>{
        try {
            const {userId, friendId} = req.params;
            let user = await User.findById(userId);
            if(user) {
                user.friends = user.friends.filter(friend => {
                    return (friend !== friendId)
                })
            }
            const result = await user.save();
            res.status(201).json(result);
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            })
        }
    },
}