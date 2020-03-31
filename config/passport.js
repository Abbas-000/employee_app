const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');


passport.serializeUser((user, done) => {
  done(null, user.id);// this method stores the user's id in the session
});

passport.deserializeUser((id, done) => {// this method retrieves the user's info from the session
  User.findById(id, (err, user) => {
    done(err, user);
  });
});



passport.use('local.signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({'email': email}, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false, req.flash('error', 'Email already exists.'));
    }
    var newUser = new User();
    newUser.fullname = req.body.fullname;
    newUser.email = req.body.email;
    newUser.password = newUser.encryptPassword(req.body.password);
    newUser.role = req.body.role;
    newUser.contact = req.body.contact;


    newUser.save(err => {
      return done(null, newUser);
    })
  })
}))


passport.use('local.login', new localStrategy({
  emailField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({'email': email}, (err, user) => {
    if (err) {
      return done(err);
    }
    var messages = [];
    if (!user || !user.validPassword(password)) {
      messages.push('email or password is incorrect');
      return done(null, false, req.flash('error', messages));
    }
    return done(null, user);
  })
}))
