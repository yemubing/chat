
var fs = require('fs');
var path = require('path')
var bodyParser = require('body-parser');

var express = require('express');
var router = express.Router();
router.use('/', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});
router.post('/', function (req, res, next) {
  next();
},function(req,res){
  var des_file = path.resolve(__dirname, '../dist') + '/' + req.files[0].originalname;
  const fileName = req.files[0].originalname;
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        response = {
          message: 'file uploaded successfully',
          path: `http://www.yemb.ren/${fileName}`,
          filename: req.files[0].originalaname
        };
      }
      res.end(JSON.stringify(response));
    })
  })
});


module.exports = router;
