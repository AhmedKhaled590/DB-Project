var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('pages/Admin_MAIN',{title:"Blood Bank",css1:"home",css2:"Preq",css3:"animate",scrp:"home"})
});

router.get('/Don', function(req, res, next) {
  res.render('pages/Admin_DON',{title:"Blood Bank",css1:"home",css2:"style",css3:"animate",scrp:"home"})
});


router.get('/Tests', function(req, res, next) {
  res.render('pages/TestRes',{title:"Blood Bank",css1:"home",css2:"style",css3:"animate",scrp:"home"})
});

router.get('/Orders', function(req, res, next) {
  res.render('pages/Orders',{title:"Blood Bank",css1:"home",css2:"style",css3:"",scrp:"home"})
});


router.get('/Inventory', function(req, res, next) {
  res.render('pages/Inventory',{title:"Blood Bank",css1:"home",css2:"style",css3:"",scrp:"home"})
});

router.get('/Branches', function(req, res, next) {
  res.render('pages/Branches',{title:"Blood Bank",css1:"home",css2:"Preq",css3:"reg",scrp:"home"})
});


module.exports = router;
