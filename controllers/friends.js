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

module.exports = {
  getOwnFriends,
  getFriend,
};
