var express = require('express');
var router = express.Router();
// database
const { rows } = require('mssql');
var db = require('../DB/DatabaseConfig');

router.get('/', function(req, res, next) {

  var sql_query=`select Fname,SSN, Notification from DONOR 
    where Notification != 'NULL'  
  `;
  db.all(sql_query, [], (err, rows) => {
    if (err) 
    {
      console.log(err);   // if error go to home 
      res.render('pages/Home', { title: "Blood Bank", css1: "home", css2: "Preq", css3: "animate", scrp: "home" })
    }
    else 
    {  
        // if done display them
        res.render('pages/Notif',{title:"Blood Bank",css1:"reg",css2:"notif",css3:"animate",scrp:"notif" , data:rows})
        rows.forEach((row) => {
          console.log(row.Notification);
        });
    }
  })
  return ;
});



module.exports = router;
