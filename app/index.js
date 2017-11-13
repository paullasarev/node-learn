require("babel-register");

const express = require('express');
const morgan = require('morgan');
const config = require("./config");
const { User, Product } = require("./models");
const { Importer } = require('./code');

const PORT = 8080;
const HOST = '0.0.0.0';

console.log("app name:", config.App.name);
// const user = new User();
// const product = new Product();

// const imp = new Importer();
// const res = imp.importSync('./data');
// console.log(res);

// imp.watch('./data').then((res)=>{
//   console.log(res)
// })

const app = express();
app.use(morgan('tiny'));

const router = express.Router();
router.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.use('/', router)

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
