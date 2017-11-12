import fs from 'fs';
import csv from 'csv-parser';
import toJson from './to-json';
import { autobind } from 'core-decorators';
import path from 'path';

export class CsvToJsonInPlace {
  constructor(argv) {
    this.file = argv.file;
    this.tmpFile = `${this.file}.json`;
    const structured = path.parse(this.file);
    delete structured.base;
    structured.ext = '.json';
    this.outFile= path.format(structured);
  }

  run() {
    fs.createReadStream(this.file)
      .pipe(csv())  
      .pipe(toJson())
      .pipe(fs.createWriteStream(this.tmpFile))
      .on('close', this.onClose)
  }

  @autobind
  onClose(err) {
    if (err) {
      return;
    }
    fs.rename(this.tmpFile, this.outFile, this.onRename);
  }

  @autobind
  onRename(err) {
    console.log('done', this.outFile);
  }
}
