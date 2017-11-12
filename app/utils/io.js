export class IO {
  constructor(argv) {
    this.file = argv.file;
  }

  run() {
    console.log('io', this.file);
  }
}