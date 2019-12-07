const google = require('./googleStrategy');
const { User } = require('../models');

module.exports = (passport) => { // passport - app.js의 passport모듈의 객체
    passport.serializeUser((user, done)=>{   // login 메서드 실행 시 호출
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done)=>{
        User.findOne({where : {id}})
        .then(user => done(null, user))
        .catch(err => done(err));
    });

    google(passport);
}