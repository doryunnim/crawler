var express = require('express');
var router = express.Router();
const User = require('../models').User;

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/register/:profile', async (req, res, next) => {
  console.log('로그인 버튼클릭');
  console.log(req.params.profile);
  var userList = (req.params.profile).split(',');
  var uid = userList[0];
  var uname = userList[1];
  var uemail = userList[2];

  try {
    const exUser = await User.findOne({
      where: {
        user_id: uid
      }
    }); // select * from users where = email ;
    if (!exUser) { //exUser 0이거나 null이면 if 실행 
      await User.create({ //테이블안에 열을 만들어 주는 메서드
        user_id: uid,
        name: uname,
        email: uemail,
      })
    } else {
      console.log('user가 있음');
    }
    return res.redirect('http://localhost:3000/brand');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});



module.exports = router;