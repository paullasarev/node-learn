import { each } from 'lodash';
import Url from 'url';

export function parseQuery(req, res, next) {
  const url = Url.parse(req.url, true)

  req.parsedQuery = url.query;
  
  console.log('query', req.parsedQuery)
  next();
}