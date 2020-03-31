require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session); // connect-mongo is the store of express-session
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');



mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on("error", console.error.bind(console, "failed connecting to database"));
db.once("open", function() {
  console.log("successfull connection");
});


require('./config/passport');


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(session({
  secret: 'thisismysecretkey',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



app.get('/', (req, res) => {
  res.render('home', {title: 'Sign Up', hasError: false});
});

require('./routes/user')(app, passport);
require('./routes/employees')(app);



// should be at the very bottom of the stack
app.use((req, res, next) => {
  res.status(404).send('sorry! we could not find that');
})

app.listen(process.env.PORT, () => {
  console.log(`App is running live on http://localhost:${process.env.PORT}`);
});
