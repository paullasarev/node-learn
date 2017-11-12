import fs from 'fs';
import csv from 'csv-parser';
import JSONStream from 'JSONStream';
import through2 from 'through2';

export class CsvToJson {
  constructor(argv) {
    this.file = argv.file;
  }

  run() {
    fs.createReadStream(this.file)
      .pipe(csv())
      // .pipe(through2({ objectMode: true }, function (chunk, enc, callback) {
      //   this.push(JSON.stringify(chunk) + ',\n');
      //   callback();
      // }), function(chunk, enc, callback){
      //   this.push("]\n");
      // })
      // .pipe(csv.stringify())
      .pipe(JSONStream.stringify())
      .pipe(process.stdout);
  }
}
