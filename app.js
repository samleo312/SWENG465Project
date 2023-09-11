const express = require('express');
const app = express();
const port = 3000;

const indexRoute = require('./routes/index');
const homeRoute = require('./routes/home');

app.use('/', indexRoute);
app.use('/home', homeRoute);
app.use(express.static('./images'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})