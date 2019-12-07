var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy

module.exports = (passport) => { 
    passport.use(new GoogleStrategy({
        clientID: '1002155686603-tigofegn3l1jnb2o3nmo3ufllcpphfqj.apps.googleusercontent.com',
        clientSecret: 'u5Ed_F_eaiqjDJLZZelCwLmq',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    }, async(accessToken, refreshToken, profile, done) => {
        try{
            console.log("accessToken : "+accessToken);
            console.log(refreshToken);
            console.log(profile);
            const exUser = await User.findOne({ where: { snsId: profile.id, provider: 'google'}});
            if(exUser){
                done(null, exUser);
            }else{
                const newUser = await User.create({
                    emai: profile._json && profile._json.kaccount_email,
                    nickname: profile.displayName,
                    snsId: profile.id,
                    provider: 'google',
                });
                done(null, newUser);
            }
        }catch(error){
            console.log()
            console.error(error);
            done(error);
        }
    }));
}