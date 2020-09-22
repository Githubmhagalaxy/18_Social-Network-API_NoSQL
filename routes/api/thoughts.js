var express = require('express');
var router = express.Router();

const thoughtsController = require('../../controllers/api/thoughts');

// base URL: /api/thoughts

router.route('/')
    .get(thoughtsController.getAllThoughts) // get all thoughts
    .post(thoughtsController.postAddNewThought) // to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array eld)

router.route('/:id')
    .get(thoughtsController.getSingleThought) // get a single thought by its _id
    .put(thoughtsController.putUpdateAThought) // update a thought by its _id
    .delete(thoughtsController.deleteAThought) // remove a thought by its _id

router.route('/:thoughtId/reactions')
    .post(thoughtsController.postAddNewReaction) // create a reaction stored in a single thought's reactions array eld

router.route('/:thoughtId/reactions/:reactionId')
    .delete(thoughtsController.deleteAReaction) // pull and remove a reaction by the reaction's reactionId value


module.exports = router;