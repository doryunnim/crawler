const express = require('express');
const router = express.Router();
// const {auth} = require('../index')
const { Brand_list } = require('../models');  

/* GET home page. */
router.get('/', function(req, res, next) {
  Brand_list.findAll({
    order: [
      ['brand_name', 'ASC'],
    ]
  })
    .then((lists)=>{
      res.render('main', {lists});
    })
    .catch((err) =>{
      console.error(err);
      next(err);
    })
});

// router.get('/login', function(req, res, next){
//   res.redirect(authUrl);
// });

// router.get('/auth/google/callback', async function(req, res){
  
//   res.redirect("http://localhost:3000");
//   auth.list();
// })


module.exports = router;
