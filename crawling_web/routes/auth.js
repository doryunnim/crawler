const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope:
    ['profile', 'email', 'openid', 'https://www.googleapis.com/auth/plus.login']}));

router.get('/google/callback', passport.authenticate('google',{
    failureRedirect: '/',
}),(req, res) => {
    res.redirect('localhost:3000');
});

router.get('/logout', isLoggedIn, (req, res)=>{
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;