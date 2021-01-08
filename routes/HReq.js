var express = require('express');
var router = express.Router();

// DataBase
const { rows } = require('mssql');
var db = require('../DB/DatabaseConfig');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('pages/HReq',{title:"Blood Bank",css1:"reg",css2:"Preq",css3:"animate",scrp:"reg"})
});

router.post('/', async(req, res) =>{
    const BloodGroup =req.body.BloodGroup ; 
    const Quantity =req.body.Quantity ;
    // current data 
    var today = new Date();
    var curr_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    var sql_query=` INSERT INTO ORG_ORDER (Blood_Type, Req_Amount , Req_Date) 
    VALUES ('${BloodGroup}' , ${Quantity} , '${curr_date}' ) ;` ;

    db.all(sql_query, 
      (err) => {
        if (err) 
        {
          res.render('pages/HReq',{title:"Blood Bank",css1:"reg",css2:"Preq",css3:"animate",scrp:"reg"})
          return console.log(err);
        }
        else 
          return res.render('pages/Home', { title: "Blood Bank", css1: "home", css2: "Preq", css3: "animate", scrp: "home" })
      })
    
});
  module.exports = router;
    