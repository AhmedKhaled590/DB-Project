var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('./blood.db',(err)=>{
    if(err)console.log(err.message);
    else console.log("success");
    db.run("update Branch Set Phone_Num = '01144075825' where branch_id=1 ",(err)=>{
      if(err)console.log(err.message);
      else console.log("success");
    });
  })

  res.render('pages/Main',{title:"Blood Bank",css1:"main",css2:"",css3:"",scrp:""});
});


module.exports = router;