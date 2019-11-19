var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main');
});

router.get('/event', function(req, res, next){
  res.render('event_list')
})

module.exports = router;
