const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const indexRoute = require('./routes/index');
const homeRoute = require('./routes/home');
const accountRoute = require('./routes/account');
const aboutRoute = require('./routes/about');
const registerRoute = require('./routes/register')

app.use('/', indexRoute);
app.use('/home', homeRoute);
app.use('/account', accountRoute);
app.use('/about-us', aboutRoute);
app.use('/register', registerRoute)
app.use(express.static('./images'));
app.use(express.static('styles'));



app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})