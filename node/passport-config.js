const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

passport.use('local',new LocalStrategy({
usernameField:'username',
passwordField:'password'
},
function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.isValid(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}
));

passport.serializeUser(function(user, done) {
    if(user) done(null, user);
});
  
passport.deserializeUser(function(id, done) {
    done(null, id);
});