var express = require('express');
var router = express.Router();

//set looged =1

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('pages/Login',{title:"Blood Bank",css1:"util",css2:"login",css3:"animate",scrp:"main"})
});

module.exports = router;
