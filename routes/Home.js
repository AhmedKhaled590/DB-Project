var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('pages/Home',{title:"Blood Bank",css1:"home",css2:"Preq",css3:"animate",scrp:"home"})
});

router.get('/Tests', function(req, res, next) {
  res.render('pages/TestRes_DON',{title:"Blood Bank",css1:"home",css2:"Preq",css3:"animate",scrp:"home"})
});

router.get('/ChangeAppointment', function(req, res, next) {
  res.render('pages/CHGAppointement',{title:"Blood Bank",css1:"home",css2:"Preq",css3:"animate",scrp:"home"})
});

module.exports = router;
