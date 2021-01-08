var express = require('express');
const { rows } = require('mssql');
var router = express.Router();
var db = require('../DB/DatabaseConfig');

//code to get today's date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
document.write(today);


/* GET users listing. */
router.get('/', function(req, res, next) {
  let query=`SELECT D.Blood_Type,COUNT * FROM DON_RECORD AS DR INNER JOIN DONOR AS D WHERE DR.SSN=D.SSN GROUP BY Blood_Type`;
  db.all(qurey,)
  res.render('pages/Home',{title:"Blood Bank",css1:"home",css2:"Preq",css3:"animate",scrp:"home"})
});

router.get('/Tests', function(req, res, next) {
  res.render('pages/TestRes_DON',{title:"Blood Bank",css1:"home",css2:"Preq",css3:"animate",scrp:"home"})
});

router.get('/ChangeAppointment', function(req, res, next) {
  res.render('pages/CHGAppointement',{title:"Blood Bank",css1:"home",css2:"Preq",css3:"animate",scrp:"home"})
});

module.exports = router;


