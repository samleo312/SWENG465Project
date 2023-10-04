const express = require('express');
const app = express();
const port = 3000;

const indexRoute = require('./routes/index');
const homeRoute = require('./routes/home');
const accountRoute = require('./routes/account');


app.use('/', indexRoute);
app.use('/home', homeRoute);
app.use('/account', accountRoute);
app.use(express.static('./images'));
app.use(express.static('./styles'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})