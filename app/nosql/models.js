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