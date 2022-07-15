const express = require('express');
const router = express.Router();

const friendsController = require('../controllers/friends');

router.get('/', friendsController.getAllFriends);
router.get('/:id', friendsController.getFriend);

module.exports = router;
