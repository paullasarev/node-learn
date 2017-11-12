import fs from 'fs';
import { autobind } from 'core-decorators';
import request from 'request';
import StreamConcat from 'stream-concat';
import path from 'path';
import { each } from 'lodash';

export class CssBundler {
  constructor(argv) {
    this.path = argv.path;
    this.bundlerName = "bundler.css";
    this.outFile = path.join(this.path, this.bundlerName);
    this.extCss = "https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css";
  }

  run() {
    fs.readdir(this.path, {}, this.onReaddir);
  }

  @autobind
  onReaddir(err, files) {
    if(err) return;

    const streams = [];
    const nameExp = new RegExp('^.*\.css$');
    each(files, (file) => {
      if (file === this.bundlerName) return;
      if (nameExp.test(file)) {
        console.log(file)
        streams.push(fs.createReadStream(path.join(this.path, file)));
      }
    });
    console.log(this.extCss);
    streams.push(request(this.extCss));

    const combinedStream = new StreamConcat(streams);
    combinedStream
      .pipe(fs.createWriteStream(this.outFile))
      .on('finish', () => { console.log('done') })
    ;
  }

}
