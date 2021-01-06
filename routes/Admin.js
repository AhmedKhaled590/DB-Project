var express = require('express');
const { rows } = require('mssql');
var router = express.Router();
var db = require('../DB/DatabaseConfig');


var User;
db.each('SELECT fname FROM donor where logged =0', function (err, user) {
  if (err) throw err;
  User = user;
});




router.get('/', function (req, res, next) {
  res.render('pages/Admin_MAIN', { title: "Blood Bank", css1: "home", css2: "Preq", css3: "animate", scrp: "home", UserName: User.Fname })

});


var tot;
router.get('/Don', function (req, res, next) {
  db.all('SELECT *from Donation_requests R,DONOR D WHERE D.SSN = R.SSN AND ( r.test_result!="CONFIRMED" OR r.test_result!="REJECTED") ', function (err, rows) {

    db.all('SELECT COUNT(*) AS n FROM DONATION_REQUESTS',[],(err,t)=>{
      t.forEach(r=>{
        console.log(r.n);
        tot=r;
        res.render('pages/Admin_DON', { title: "Blood Bank", css1: "home", css2: "style", css3: "animate", scrp: "home", Donations: rows, UserName: User.Fname ,total:tot})
      })
    });
  });
});


router.get('/DonRecords', function (req, res, next) {
  db.all('SELECT * FROM DON_RECORD R ,DONOR D,num v WHERE D.SSN=R.SSN and r.ssn = v.ssn ', function (err, rows) {
    res.render('pages/Admin_DONRecords', { title: "Blood Bank", css1: "home", css2: "style", css3: "animate", scrp: "home", Donations: rows, UserName: User.Fname })
  });
});



router.get('/Tests', function (req, res, next) {
  db.all('SELECT d.ssn,d.fname,d.blood_type,q.test_result,dr.fname as drname FROM DONOR D,Donation_requests q ,DOCTORs_DONORS_CASES N,doctor dr WHERE q.ssn=d.ssn and D.SSN = N.SSN and dr.ssn = n.DOCTOR_SSN and q.test_result="QUEUED"', [], function (err, rows) {
    res.render('pages/TestRes', { title: "Blood Bank", css1: "home", css2: "style", css3: "animate", scrp: "home", UserName: User.Fname, res: rows })
  });
});



router.post('/Tests', function (req, res, next) {
  var SSN = req.body.SSN;
  var Don_date = req.body.DONDATE;

  db.all('update Donation_requests set DETERMINED_DATE = ? WHERE SSN = ?', [Don_date, SSN], function (err) {
    if (err) console.log(err);
    else {
      db.all('SELECT d.ssn,d.fname,d.blood_type,q.test_result,dr.fname as drname FROM DONOR D,Donation_requests q ,DOCTORs_DONORS_CASES N,doctor dr WHERE q.ssn=d.ssn and D.SSN = N.SSN and dr.ssn = n.DOCTOR_SSN and q.test_result="QUEUED"', [], function (err, rows) {
        res.render('pages/TestRes', { title: "Blood Bank", css1: "home", css2: "style", css3: "animate", scrp: "home", UserName: User.Fname, res: rows })
      });
    }

  })
});



router.get('/Orders', function (req, res, next) {
  res.render('pages/Orders', { title: "Blood Bank", css1: "home", css2: "style", css3: "", scrp: "home" })
});




router.get('/Inventory', function (req, res, next) {
  var sql = 'SELECT*FROM INVENTORY I,DON_RECORD R ,DONOR D WHERE I.Sample_ID=R.Sample_ID AND R.SSN=D.SSN ';

  var NumberOfDonations;
  db.all('SELECT COUNT(*) as n FROM INVENTORY', function (err, num) {
    num.forEach(nd => {
      NumberOfDonations = nd.n;
    })
  })

  db.all('SELECT blood_type, COUNT(*) as n FROM INVENTORY group by blood_type', function (err, rows) {
      sample = rows;
  });

  var bestDonor;
  db.all('select fname,d.ssn,count(*) as n from inventory i ,DON_RECORD d,donor dn WHERE i.Sample_ID=d.Sample_ID and d.ssn=dn.ssn GROUP by d.ssn,dn.fname ORDER by n DESC limit 1',(err,dn)=>{
    dn.forEach(don=>{
      bestDonor=don;
    })
  })

  db.all(sql, [], function (err, inv) {
    res.render('pages/Inventory', { title: "Blood Bank", css1: "home", css2: "style", css3: "", scrp: "Inventory", Inventory: inv, numdon: NumberOfDonations, samples: sample,donor:bestDonor })

  })
});


router.get('/Branches', function (req, res, next) {
  db.all('SELECT*FROM BRANCH', [], function (err, branches) {
    res.render('pages/Branches', { title: "Blood Bank", css1: "home", css2: "Preq", css3: "reg", scrp: "home", Branch: branches })
  })
});

router.post('/Branches', function (req, res, next) {
  var Location = req.body.Location;
  var PhoneNum = req.body.PhoneNum;
  var BranchID = req.body.BranchID;
  if (Location!=undefined && PhoneNum!=undefined) {
    db.all('Insert Into Branch (Location,Phone_Num) values (?,?)', [Location, PhoneNum], function (err) {
      if (err) console.log(err);
      else {
        db.all('SELECT*FROM BRANCH', [], function (err, branches) {
          res.render('pages/Branches', { title: "Blood Bank", css1: "home", css2: "Preq", css3: "reg", scrp: "home", Branch: branches })
        });
      }
    });
  }

  else if (BranchID!=undefined) {
    db.all('delete FROM BRANCH where Branch_ID = ?', [BranchID], function (err, rows) {
      db.all('SELECT*FROM BRANCH', [], function (err, branches) {
        res.render('pages/Branches', { title: "Blood Bank", css1: "home", css2: "Preq", css3: "reg", scrp: "home", Branch: branches })
    });
  });
  }

});


module.exports = router;
