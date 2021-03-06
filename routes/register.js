var express = require('express');
var router = express.Router();
// const url = 'mongodb://127.0.0.1:27017';
const url = require('../config').mgdUrl;

let MongoClient = require('mongodb').MongoClient;

router.post('/', function(req, res, next) {
  const reqBody = req.body;

  MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
    if (err) throw err;
    const dbase = db.db('ymb');
    const list = dbase.collection("users");

    list.find({"phoneNo": reqBody.phoneNo}).toArray((err, result) => {
      if (err) throw err;
      if (result.length <= 0) {
        list.insertOne(reqBody, (err, result) => {
          if (err) throw err;
          req.session.userName = reqBody.phoneNo;
          res.cookie('login', true, {httpOnly: false});
          res.cookie('userName', reqBody.phoneNo, {httpOnly: true});
          res.json({"success": true});
          db.close();
        })
      } else {
        res.json({"success": false, "msg": "该用户名/手机号已存在"});
      }
    });
  });
});

module.exports = router;
