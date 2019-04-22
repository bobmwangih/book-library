const passport= require('passport');
require('./strategies/local.strategy')();

function passportConfig(app){
   app.use(passport.initialize());
   app.use(passport.session());
    //stores user in a session
    passport.serializeUser((user,done)=>{
        done(null,user);
    });

    //retrieves user from a session
    passport.deserializeUser((user,done)=>{
        done(null,user);
    });
 
};

module.exports=passportConfig;