const express = require('express');
const router = express.Router();

const { Brand_list } = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  Brand_list.findAll()
    .then((lists)=>{
      res.render('main', {lists});
    })
    .catch((err) =>{
      console.error(err);
      next(err);
    })
});

module.exports = router;