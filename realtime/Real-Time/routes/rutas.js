var express = require('express');
var router = express.Router();
var User = require('../controladores/Users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Luis Fernando Raga' });
});

router.get('/noti', User.NewUser);

module.exports = router;
