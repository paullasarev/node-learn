import DirWatcher from './dir-watcher';
import { promisify } from 'util';
import { readdir, stat, readFile } from 'fs';
import { resolve, parse } from 'path';

const readFileP = promisify(readFile);

const WATCH_DELAY = 3000;

function filewalker(dir, done) {
  let results = [];

  readdir(dir, function(err, list) {
      if (err) return done(err);

      let pending = list.length;

      if (!pending) return done(null, results);

      list.forEach(function(fileName){
          const file = resolve(dir, fileName);

          stat(file, function(err, stat){
              if (stat && stat.isDirectory()) {
                  // results.push(file);
                  filewalker(file, function(err, res){
                      results = results.concat(res);
                      if (!--pending) done(null, results);
                  });
              } else {
                  results.push(file);

                  if (!--pending) done(null, results);
              }
          });
      });
  });
};

module.exports = class Importer {
  import(path) {
    console.log('import', path)
    return new Promise((resolve, reject) => {
      const watcher = new DirWatcher();
      const emitter = watcher.watch(path, WATCH_DELAY);
      emitter.on(watcher.DIR_CHANGE_EVENT, () => {
        filewalker(path, (err, paths)=>{
          if (err) {
            reject(err);
          } else {
            //resolve(paths);
            Promise.all(paths.map((file)=>readFileP(file))).then((contents)=>{
              resolve(contents);
            })
          }
        })
      });
    });
  }

  importSync(path) {

  }
}