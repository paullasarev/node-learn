import DirWatcher from './dir-watcher';
import { promisify } from 'util';
import { readdir, stat, readFile, readdirSync, statSync, readFileSync } from 'fs';
import { resolve, parse } from 'path';

const readFileP = promisify(readFile);

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

function filewalkerSync(dir) {
  let results = [];

  readdirSync(dir).forEach((fileName) => {
    const file = resolve(dir, fileName);
    const stat = statSync(file);
    if (stat && stat.isDirectory()) {
        const res = filewalkerSync(file);
        results = results.concat(res);
    } else {
        results.push(file);
    }
  });
  
  return results;
};

export default class Importer {
  WATCH_DELAY = 3000;

  watch(path) {
    return new Promise((resolve, reject) => {
      const watcher = new DirWatcher();
      watcher.watch(path, this.WATCH_DELAY);
      watcher.on(watcher.DIR_CHANGE_EVENT, () => {
        watcher.close();
        this.import(path).then(resolve);
        // resolve(this.importSync(path))
      })
    })
  }

  import(path) {
    return new Promise((resolve, reject) => {
      filewalker(path, (err, paths) => {
        if (err) {
          reject(err);
        } else {
          Promise.all(paths.map((file)=>readFileP(file))).then((contents)=>{
            resolve(this.makeResult(paths, contents));
          })
        }
      });
    });
  }

  importSync(path) {
    const paths = filewalkerSync(path);
    const contents = paths.map((file) => readFileSync(file));
    return this.makeResult(paths, contents);
  }

  makeResult(paths, contents) {
    const results = [];
    for(let ind = 0; ind < paths.length; ++ind) {
      results.push({
        path: paths[ind],
        content: contents[ind],
      })
    }
    return results;
  }
}