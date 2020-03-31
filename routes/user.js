const User = require('../models/user');


module.exports = (app, passport) => {
  app.route('/signup')
    .get((req, res) => {
      let error = req.flash('error');
      res.render('home', {title: 'Sign Up', hasError: error.length > 0, msg: error[0]});
    })
    .post(passport.authenticate('local.signup', {
      successRedirect: '/dashboard',
      failureRedirect: '/signup',
      failureFlash: true
    }));
  app.route('/login')
    .get((req, res) => {
      let error = req.flash('error');
      console.log(error);
      res.render('login', {title: 'Login to account', hasError: error.length > 0, msg: error[0]});
    })
    .post(passport.authenticate('local.login', {
      // successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true
    }), (req, res) => {
      console.log(req.body.rememberme);
      if (req.body.rememberme) {
        req.session.cookie.maxAge = 30*24*60*60*1000;
      } else {
        req.session.cookie.expires = null;
      }
      res.redirect('/dashboard');
    });



}
