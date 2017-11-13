require("babel-register");

const express = require('express');
const morgan = require('morgan');
const config = require("./config");
const { User, Product } = require("./models");
const { Importer } = require('./code');

const PORT = 3000;
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

const products = require('./data/products.json');

const app = express();
app.use(morgan('tiny'));

const router = express.Router();
router.get('/', (req, res) => {
  res.send('Hello world\n');
});

router.get('/products', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(products, null, '  '));
});

app.use('/api', router)

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
