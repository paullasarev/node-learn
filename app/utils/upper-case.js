import through2 from 'through2';
import { autobind } from 'core-decorators';

function upper(chunk, enc, callback) {
  this.push(chunk.toString().toUpperCase())
  callback()
}

export class UpperCase {
  constructor(argv) {
  }

  run() {
    process.stdin
      .pipe(through2(upper))
      .pipe(process.stdout)
  }

}