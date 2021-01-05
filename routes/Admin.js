var express = require('express');
const { rows } = require('mssql');
var router = express.Router();
var db = require('../DB/DatabaseConfig');


router.get('/', function(req, res, next) {
  db.each('SELECT fname FROM donor where logged =0',function(err, row){
    res.render('pages/Admin_MAIN',{title:"Blood Bank",css1:"home",css2:"Preq",css3:"animate",scrp:"home",UserName:row.Fname})
  });

});


router.get('/Don', function(req, res, next) {
  var User;
  db.each('SELECT fname FROM donor where logged =0',function(err, user){
    if(err)throw err;
    User  = user;
  });
    db.all('SELECT*from don_record R,DONOR D WHERE D.SSN = R.SSN ',function(err, rows){
    res.render('pages/Admin_DON',{title:"Blood Bank",css1:"home",css2:"style",css3:"animate",scrp:"home",Donations:rows,UserName:User.Fname})
});
});



router.get('/Tests', function(req, res, next) {
  res.render('pages/TestRes',{title:"Blood Bank",css1:"home",css2:"style",css3:"animate",scrp:"home"})
});

router.get('/Orders', function(req, res, next) {
  res.render('pages/Orders',{title:"Blood Bank",css1:"home",css2:"style",css3:"",scrp:"home"})
});


router.get('/Inventory', function(req, res, next) {
    var sql ='SELECT*FROM INVENTORY I,DON_RECORD R ,DONOR D WHERE I.Sample_ID=R.Sample_ID AND R.SSN=D.SSN ';

    var NumberOfDonations;
    var NumberOfAAtype;
    db.all('SELECT COUNT(*) as n FROM INVENTORY',function(err,num){
      num.forEach(nd=>{
        NumberOfDonations=nd.n;
      })
    })

    db.all('SELECT COUNT(*) as n FROM INVENTORY where BLOOD_TYPE="A+"',function(err,num){
      num.forEach(nd=>{
        console.log(nd);
        NumberOfAAtype=nd.n;
      })
    })


    db.all(sql,[],function(err,inv){
      res.render('pages/Inventory',{title:"Blood Bank",css1:"home",css2:"style",css3:"",scrp:"Inventory",Inventory:inv,numdon:NumberOfDonations,numaa:NumberOfAAtype})
  
    })
});

router.get('/Branches', function(req, res, next) {
  res.render('pages/Branches',{title:"Blood Bank",css1:"home",css2:"Preq",css3:"reg",scrp:"home"})
});




module.exports = router;
