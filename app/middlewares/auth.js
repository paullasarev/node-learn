import Url from 'url';
const jwt = require('jsonwebtoken');

const secretKey = 'shhhhh';

export function createToken() {
  return jwt.sign({ foo: 'bar' }, secretKey);
}

export function auth(req, res, next) {
  const url = Url.parse(req.url, true)
  if (url.path !== '/api/auth' && url.path !== '/api/login') {
    const token = req.headers.token;
    console.log('verity token', url.path, token)
    jwt.verify(token, secretKey, function(err, decoded) {
      if (err) {
        res.sendStatus(401);
        return;
      }
      console.log('verified', url.path, decoded);
      //next();
    })
  } else {
    next();
  }

}