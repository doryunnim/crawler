var express = require('express');
var router = express.Router();

var Brand_list = require('../models').Brand_list;
var User = require('../models').User;
var User_Brand = require('../models').User_Brand;
const Event = require('../models').Event;
const {Like} = require('../models');


// 모든 브랜드 뿌려줌
router.get('/', function (req, res, next) {
  // Brand_list.findAll()
  //       .then((brands)=>{
  //         console.log(brands);
  //         res.render('main', {brands});
  //       })
  //       .catch((err)=>{
  //         console.error(err);
  //         next(err);
  //       });
  res.redirect('/');
});

// 브랜드 추가
router.post('/addbrand/:brand_name', function (req, res, next) {
  console.log('브랜드추가');

  // Like.findOne({where:{name:req.body.user}})
  // .then((users) =>{
  // console.log(users);
  // Like.findAll({
  //     where: {
  //       user_email: req.body.user_email,
  //       brand_name: req.params.brand_name
  //     }
  //   })
  //   .then()
  //   .catch(()=>{
      Like.create({
        user_email: req.body.user_email,
        brand_name: req.body.brand_name,
      })
    // })

  // res.redirect('http://localhost:3000/brand');

});

router.delete('/delbrand/:brand_name', (req, res, next) => {
  console.log('브랜드삭제');
  Like.destroy({
    where: {
      user_email: req.body.user_email,
      brand_name: req.body.brand_name
    }
  })
});

// 브랜드 클릭시
router.get('/:brand_name', function (req, res, next) {
  Event.findAll({
      where: {
        brand_name: req.params.brand_name
      }
    })
    .then((events) => {
      res.render('event_list', {
        events
      });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
})

// 이벤트 클릭시
router.get('/:brand_name/:id', function (req, res, next) {
  Event.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((event) => {
      res.render('event_detail', {
        event
      });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
});



module.exports = router;