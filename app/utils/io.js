import fs from 'fs';

export class IO {
  constructor(argv) {
    this.file = argv.file;
  }

  run() {
    fs.createReadStream(this.file)
      .pipe(process.stdout);
  }
}