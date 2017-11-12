import through2 from 'through2';
import { autobind } from 'core-decorators';

export class UpperCase {
  constructor(argv) {
  }

  run() {
    process.stdin
      .pipe(through2(this.upper))
      .pipe(process.stdout)
  }

  @autobind
  upper(pipe, chunk, enc, callback) {
    pipe.push(chunk.toString().toUpperCase())
    callback()
  }
}