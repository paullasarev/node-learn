import fs from 'fs';
import csv from 'csv-parser';
import toJson from './to-json';

export class CsvToJson {
  constructor(argv) {
    this.file = argv.file;
  }

  run() {
    fs.createReadStream(this.file)
      .pipe(csv())  
      .pipe(toJson())
      .pipe(process.stdout);
  }
}
