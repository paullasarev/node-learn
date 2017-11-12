import yargs from 'yargs';
import { isEmpty, clone } from 'lodash';

export class StreamsApp {
  constructor(argv) {
    this.argv_ = yargs(clone(argv).slice(2))
      .strict()
      .command({
        command: 'io <file>',
        describe:'io from file to stdout',
        handler: this.notImplemented,
      })
      .command({
        command: 'upper-case',
        describe: 'upper case the pipe from stdin to stdout',
        handler: this.notImplemented,
      })
      .demandCommand(1, 1)
      .help()
      .argv;
  }

  notImplemented(argv) {
    console.log('command is not implemented', argv)
  }

  get argv() {
    return this.argv_;
  }

  get noArgs() {
    return !this.argv_.length; 
  }

}


