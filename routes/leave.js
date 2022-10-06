var express = require('express');
var router = express.Router();
let leaveController = require('../controllers/leaveController');

router.get('/',leaveController.viewAllUsers);

  module.exports = router;