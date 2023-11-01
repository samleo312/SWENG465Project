require('dotenv').config();

const express = require('express');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const oneDay = 1000 * 60 * 60 * 24;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));

app.use(cookieParser());

const indexRoute = require('./routes/index');
const homeRoute = require('./routes/home');
const accountRoute = require('./routes/account');
const aboutRoute = require('./routes/about');
const registerRoute = require('./routes/register');
const feedRoute = require('./routes/feed');

app.use('/', indexRoute);
app.use('/home', homeRoute);
app.use('/account', accountRoute);
app.use('/about-us', aboutRoute);
app.use('/register', registerRoute);
app.use('/feed', feedRoute);
app.use(express.static('./images'));
app.use(express.static('styles'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
