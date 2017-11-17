require("babel-register");

// const mongoose = require('mongoose');
const { connectDb, disconnectDb, User, Product, City } = require('./models');
const { dbUrl } = require('./config');

const users = require('../data/users.json');
const products = require('../data/products.json');
const cities = require('../data/cities.json');

connectDb(dbUrl)
  .then(seedUsers)
  .then(seedProducts)
  .then(seedCities)
  .catch((err)=>{
    console.log('error', err);
  })
  .then(()=>{
    disconnectDb();
  })
;

function seedUsers() {
  return Promise.resolve()
  .then(()=>{
    console.log('remove User')
    return User
      .remove({})
      .exec()
  })
  .then(()=>{
    console.log('insert User')
    return User
      .insertMany(users)
  })
  .then(()=>{
    return User.count();
  })
  .then((count)=>{
    console.log('User count:', count);
  })
}

function seedCities() {
  return Promise.resolve()
  .then(()=>{
    console.log('remove City')
    return City
      .remove({})
      .exec()
  })
  .then(()=>{
    console.log('insert City')
    return City
      .insertMany(cities)
  })
  .then(()=>{
    return City.count();
  })
  .then((count)=>{
    console.log('City count:', count);
  })
}

function seedProducts() {
  return Promise.resolve()
  .then(()=>{
    console.log('remove Product')
    return Product
      .remove({})
      .exec()
  })
  .then(()=>{
    console.log('insert Product')
    return Product
      .insertMany(products)
  })
  .then(()=>{
    return Product.count();
  })
  .then((count)=>{
    console.log('Product count:', count);
  })
}
