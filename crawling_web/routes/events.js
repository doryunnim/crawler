const express = require('express');
const router = express.Router();

const { Event } = require('../models');

/* GET home page. */
router.get('/', function(req, res, next){
  Event.findAll()
    .then((events)=>{
      console.log(events);
      res.render('event_list', {events});
    })
    .catch((err) =>{
      console.error(err);
      next(err);
    })
})

router.get('/:brand_name', function(req, res, next){
  Event.findAll({where : {brand_name: req.params.brand_name}})
    .then((events)=>{
      console.log(events);
      res.render('event_list', {events});
    })
    .catch((err) =>{
      console.error(err);
      next(err);
    })
})

module.exports = router;