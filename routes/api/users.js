var express = require('express');
var router = express.Router();

const usersController = require('../../controllers/api/users');

// base URL: /api/users

router.route('/')
    .get(usersController.getAllUsers) // all users
    .post(usersController.postNewUser) // new user

router.route('/:id')
    .get(usersController.getSingleUser) // get single user with thoughts and friends
    .put(usersController.putUpdateAUser) // update a user by its _id
    .delete(usersController.deleteAUser) // to remove user by its _id

router.route('/:userId/friends/:friendId')
    .post(usersController.postAddNewFriend) // add a new friend to a user's friend list
    .delete(usersController.deleteAFriend) // remove a friend from a user's friend list


module.exports = router;