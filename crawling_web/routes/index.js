var express = require('express');
var router = express.Router();
var Brand_list=require('../models').Brand_list;
var {Like} = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {


  Brand_list.findAll({
    order: [
      ['brand_name', 'ASC'],
    ]
  })
    .then((brands)=>{
      res.render('main', {brands});
    })
    .catch((err) =>{;
      console.error(err)
      next(err);
    })

});

router.post('/', (req, res, next)=>{
  Like.findAll({
    where:{
      user_email:req.body.user_email,
    }
  })
  .then((like)=>{
    res.json(like);
  })
})

module.exports = router;
