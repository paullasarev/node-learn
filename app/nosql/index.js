require("babel-register");

const _ = require("lodash");
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const assert = require('assert');

const { connectDb, User, City, Product, Review } = require('./models');
const { dbUrl } = require('./config');

const PORT = 3000;
const HOST = '0.0.0.0';

// var db;

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());

const router = express.Router();

router.get('/', (req, res) => {
  // const coll = db.collection('cities');
  // const cursor = coll.aggregate(
  //   { $sample: { size: 1 } }
  // );
  // cursor.next((err, doc) => {
  //   res.end(JSON.stringify(doc));
  // });
  City
    .aggregate({ $sample: { size: 1 }})
    .then((doc) => {
      res.end(JSON.stringify(doc));
    })
  ;
});

router.get('/products', (req, res) => {
  console.log('products1', req.params)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  Product.find().then(data => {
    res.end(JSON.stringify(data, null, '  '));
  })
});

router.get('/reviews', (req, res) => {
  console.log('reviews', req.params)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  Review.find().then(data => {
    res.end(JSON.stringify(data, null, '  '));
  })
});

router.get('/products/:id/reviews', (req, res) => {
  console.log('/products/:id/reviews', req.params)
  const id = req.params.id;
  Product.findById(id)
    .then(data => {
      console.log('product:', data._id)
      return (Review
        .find({product: data._id})
        .populate('user')
        .populate('product')
      );
    })
    .then(data => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data, null, '  '));
    })
    .catch(err => {
      res.statusCode = 404;
      res.end();
    })
});

router.get('/products/:id', (req, res) => {
  console.log('products2', req.params)
  const id = req.params.id;
  Product.findById(id)
    .then(data => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data, null, '  '));
    })
    .catch(err => {
      res.statusCode = 404;
      res.end();
    })
});

router.post('/products', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  Product.create(req.body)
  .then(data => {
      res.end(JSON.stringify(data, null, '  '));
  })
  .catch(err => {
    res.statusCode = 400;
    res.end(err);
  })
});

router.get('/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  User.find(/*{ attributes: {
      exclude: ['password']
    }}*/)
  .select('-password')
  .then(data => {
    res.end(JSON.stringify(data, null, '  '));
  })
});

router.get('/users/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id /*, { attributes: {
    exclude: ['password']
  }}*/)
  .select('-password') 
  .then(data => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data, null, '  '));
  })
  .catch(err => {
    res.statusCode = 404;
    res.end();
  })
});


app.use('/api', router);

connectDb(dbUrl)
  .then(()=>{
    console.log("Connected correctly to server");
    app.listen(PORT, HOST);
    console.log(`Running on http://${HOST}:${PORT}`);
  })
  .catch((err)=>{
    console.log(err);
  })
;


// MongoClient.connect(dbUrl, function(err, mongodb) {
//   assert.equal(null, err);
//   db = mongodb;
//   console.log("Connected correctly to server");
  
//   app.listen(PORT, HOST);
//   console.log(`Running on http://${HOST}:${PORT}`);
   
//   // db.close();
// });


