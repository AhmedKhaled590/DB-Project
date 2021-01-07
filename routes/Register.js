var express = require('express');
const { rows } = require('mssql');
var router = express.Router();
var db = require('../DB/DatabaseConfig');

var User

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('pages/Register',{title:"Blood Bank",css1:"reg",css2:"",css3:"",scrp:"reg"})
});

router.post('/register',function(req,res,next){
  if(req.body.userType=="Donor"){
    var ssn=req.body.SSN;
    var firstName=req.body.FirstName;
    var Minit=req.body.Minit;
    var lastName=req.body.LastName;
    var email=req.body.email;
    var password=req.body.password;
    var confirmPassword=req.body.confirmPassword;
    var bloodGroup=req.body.BloodGroup;
    var gender=req.body.Gender;
    var weight=req.body.Weight;
    var num =req.body.PhoneNo;
    var age=req.body.age;
    var gov=req.body.Gov;
    var address=req.body.Address;
    db.run(`INSERT INTO DONOR(SSN,Fname,Minit,Lname,Age,Address,Phone_Num,Email,pass_word,Gender,Blood_Type)
          VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
          [ssn,firstName,Minit,lastName,age,address,num,email,password,gender,bloodGroup],
          (err)=>{
            if(err) console.log(err);
            else{
              res.render('pages/Home', { title: "Blood Bank", css1: "home", css2: "style", css3: "animate", scrp: "home", UserName: User.Fname, res: rows })
            }
          })
  }
});

module.exports = router;
