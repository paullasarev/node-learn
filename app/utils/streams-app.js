import yargs from 'yargs';
import { isEmpty, clone } from 'lodash';
import { autobind } from 'core-decorators';

import { IO } from './io';

export class StreamsApp {
  constructor(argv) {
    this.argv_ = yargs(clone(argv).slice(2))
      .strict()
      .command({
        command: 'io <file>',
        describe:'io from file to stdout',
        handler: this.register.bind(this, IO),
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

  run() {
    if (this.handler) {
      this.handler.run();
    }
  }

  register(Handler, argv) {
    this.handler = new Handler(argv);
  }

  @autobind
  notImplemented(argv) {
    console.log('command is not implemented', argv)
  }

  get argv() {
    return this.argv_;
  }

}


