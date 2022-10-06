var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  user_id = req.session.user_id;
  if(!user_id){
    res.status(404).send('Bu sayfayı görüntüleme yetkiniz yoktur!')
  }else{
    res.status(200).render('home',{ session: req.session})
  }
  // res.render('home', { title: 'Express' , session: req.session , alertMessage:'Bu sayfayı görüntüleme yetkiniz yoktur!.' });
});

module.exports = router;
