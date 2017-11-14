require("babel-register");
const _ = require("lodash");
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const config = require("./config");
const { User, Product } = require("./models");
const { Importer } = require('./code');
const { parseQuery } = require('./middlewares/parse-query');
const { parseCookies } = require('./middlewares/parse-cookies');
const products = require('./data/products.json');
const users = require('./data/users.json');
const { auth, createToken } = require('./middlewares/auth');

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

passport.use(new LocalStrategy({
  usernameField: 'login', 
  passwordField : 'password', 
},
  function(username, password, done) {
    const el = _.find(users, {login: username, password});
    console.log('LocalStrategy', username, password, el)
    if (el) {
      return done(null, el);
    } else {
      done(null, false)
    } 
  }
));

passport.serializeUser(function(user, done) {
  console.log('serialize', user)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  const el = _.find(users, {id});
  console.log('deserialize', user, el)
  done(null, el);
});

const app = express();
app.use(morgan('tiny'));
app.use(parseQuery);
app.use(parseCookies);
app.use(auth);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const router = express.Router();
router.get('/', (req, res) => {
  console.log(req.parsedQuery)
  res.send('Hello world\n');
});

router.get('/products', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(products, null, '  '));
});

router.get('/products/:id', (req, res) => {
  const id = +req.params.id;
  const el = _.find(products, {id});
  if (el) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(el, null, '  '));
  } else {
    res.statusCode = 401;
    res.end();
  }
});

router.get('/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users, null, '  '));
});

router.get('/users/:id', (req, res) => {
  const id = +req.params.id;
  const el = _.find(users, {id});
  if (el) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const user = {...el};
    user.password = undefined;
    res.end(JSON.stringify(user, null, '  '));
  } else {
    res.statusCode = 401;
    res.end();
  }
});

router.post('/login', passport.authenticate('local'));

router.post('/auth', (req, res) => {
  const {login, password} = req.body;
  const el = _.find(users, {login, password});
  if (el) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    const token = creteToken();
    
    const resp = {
      "code": 200,
      "message": "OK",
      "data": {
        "user": {
          "email": el.email,
          "username": el.name,
          "login": login,
        }
      },
      "token": token
    };
    res.end(JSON.stringify(resp, null, '  '));
  } else {
    res.statusCode = 404;
    res.end({
      "code": 404,
      "message": "Not Found",
      "data": {  }
     });
  }
  
})

app.use('/api', router);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
