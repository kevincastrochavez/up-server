const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getOwnFriends = async (req, res) => {
  try {
    const uid = req.params.uid;
    if (!uid) {
      res
        .status(400)
        .json('Must use a valid uid to look for friends documents');
    }

    const result = await mongodb.getDb().db().collection('friends').find({
      uid: uid,
    });

    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFriend = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid friend id to find a friend');
    }

    const urlId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db()
      .collection('friends')
      .find({ _id: urlId });

    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createFriend = async (req, res) => {
  try {
    const friend = {
      fullName: req.body.fullName,
      birthdate: req.body.birthdate,
      imgUrl: req.body.imgUrl,
      favSnack: req.body.favSnack,
      giftIdea: req.body.giftIdea,
      dreamDay: req.body.dreamDay,
      uid: req.body.uid,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('friends')
      .insertOne(friend);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(`An error occurred creating a friend: ${response.error}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFriend = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid friend id to update a friend.');
    }

    const friendId = new ObjectId(req.params.id);

    const friend = {
      fullName: req.body.fullName,
      birthdate: req.body.birthdate,
      imgUrl: req.body.imgUrl,
      favSnack: req.body.favSnack,
      giftIdea: req.body.giftIdea,
      dreamDay: req.body.dreamDay,
      uid: req.body.uid,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('friends')
      .replaceOne({ _id: friendId }, friend);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(`An error occurred updating a friend: ${response.error}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFriend = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid friend id to delete a friend.');
    }

    const friendId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection('friends')
      .remove({ _id: friendId }, true);

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(`An error occurred deleting a friend: ${response.error}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getOwnFriends,
  getFriend,
  createFriend,
  updateFriend,
  deleteFriend,
};
