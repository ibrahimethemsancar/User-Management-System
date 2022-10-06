var express = require('express');
const connection = require('../database');
var router = express.Router();

router.post('/', (req ,res ,next)=> {

  var user_email = req.body.user_email;
  var user_password = req.body.user_password;

  if(user_email && user_password){
    console.log(user_email)
      var query = `select * from user_management.users where email = '${user_email}'`;
    console.log(query);
      connection.query(query , function(error,results,fields){
        console.log(results);
        if(results.length >0){

            for(var count = 0; count<results.length; count++){
                if(results[count].password == user_password){
                    req.session.user_id = results[count].id;
                    req.session.user_name = results[count].name;
                    res.redirect('/home')
                }else{
                    res.send('Incorrect Password');
                }
            }
        }else{
            res.send('Incorrect Email Address')
        }
        res.end();
    })
  }
  else{
      res.send("Your email or password is invalid.");
      res.end();
  }
});

// router.get('/logout',(req,res,next) => {
//   req.session.destroy();
//   res.redirect('/')
// });

module.exports = router;
