import fs from 'fs';

export class IO {
  constructor(argv) {
    this.file = argv.file;
  }

  run() {
    console.log('io', this.file);
    const read = fs.createReadStream(this.file);
    read.pipe(process.stdout);
  }
}