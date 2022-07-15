const express = require('express');
const router = express.Router();

const friendsController = require('../controllers/friends');

router.get('/:uid', friendsController.getOwnFriends);
router.get('/:uid/:id', friendsController.getFriend);
router.post('/', friendsController.createFriend);
router.put('/:id', friendsController.updateFriend);
router.delete('/:id', friendsController.deleteFriend);

module.exports = router;
