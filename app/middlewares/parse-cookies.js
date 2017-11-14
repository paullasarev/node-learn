import { each } from 'lodash';
import Url, {URLSearchParams } from 'url';

export function parseCookies(req, res, next) {
  req.parsedCookies = {};
  const cookies = req.headers.cookie;
  cookies && cookies.split(/\; ?/).forEach(function( cookie ) {
    const pair = cookie.split('=');
    req.parsedCookies[pair[0]] = pair[1];
  })

  console.log('cookie', req.parsedCookies)
  next();
}