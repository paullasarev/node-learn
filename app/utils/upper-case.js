import through2 from 'through2';

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