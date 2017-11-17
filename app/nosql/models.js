import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  name: String,
  login: String,
  email: String,
  password: String,
});

export const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
});

export const Product = mongoose.model('Product', productSchema);


const locationSchema = new mongoose.Schema({
  lat: Number,
  long: Number,
});

const citySchema = new mongoose.Schema({
  name: String,
  country: String,
  capital: Boolean,
  location: locationSchema,
});

export const City = mongoose.model('City', citySchema);


export function connectDb(uri) {
  console.log('connect to', uri)
  return mongoose.connection.openUri(uri, {
    useMongoClient: true,
    promiseLibrary: global.Promise,
  })
}

export function disconnectDb() {
  console.log('disconnect db')
  mongoose.disconnect();
}