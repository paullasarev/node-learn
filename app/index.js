require("babel-register");

const express = require('express');
const morgan = require('morgan');
const config = require("./config");
const { User, Product } = require("./models");
const Importer = require('./code/importer');

const PORT = 8080;
const HOST = '0.0.0.0';

console.log("app name:", config.App.name);
const user = new User();
const product = new Product();

const imp = new Importer();
imp.import('./data').then((res)=>{
  console.log(res)
})

const app = express();
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
