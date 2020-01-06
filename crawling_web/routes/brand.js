var express = require('express');
var router = express.Router();

const Event = require('../models').Event;
const {Like} = require('../models');
const {Brand_list} = require('../models');

router.get('/', function (req, res, next) {
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