var express = require('express');
var router = express.Router();

const usersRouter = require('./users');
const thoughtsRouter = require('./thoughts');


// base URL: /api

router.use('/users', usersRouter);
router.use('/thoughts', thoughtsRouter);


module.exports = router;