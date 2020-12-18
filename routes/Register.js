var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('pages/Register',{title:"Blood Bank",css1:"reg",css2:"",css3:"",scrp:"reg"})
});

module.exports = router;
