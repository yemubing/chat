var express = require('express');
var router = express.Router();
var cors = require('cors');

const url = 'mongodb://106.12.40.68:27017';

let MongoClient = require('mongodb').MongoClient;

router.post('/', function (req, res, next) {
  const reqBody = req.body;
  const userName = req.session.userName;
  if (userName !== undefined) {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      const dbase = db.db('ymb');
      dbase.collection("chats").insertOne(Object.assign(reqBody, {userName: userName}), (err, result) => {
        if (err) throw err;
        res.json({ success: true, id: result.ops[0]._id});
        db.close();
      });
    });
  } else {
    res.json({ success: false, msg: '请先登录' });
  }
});

module.exports = router;
