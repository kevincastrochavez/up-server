const express = require('express');
const router = express.Router();

const friendsController = require('../controllers/friends');

router.get('/:uid', friendsController.getOwnFriends);
router.get('/:uid/:id', friendsController.getFriend);

module.exports = router;
