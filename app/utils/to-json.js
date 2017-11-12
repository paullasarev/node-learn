import through2 from 'through2';

export default function toJson() {
  return through2({ objectMode: true }, function (chunk, enc, callback) {
    if (this.hasData) {
      this.push(',\n');
    } else {
      this.push('[\n');
      this.hasData = true;
    }
    this.push(JSON.stringify(chunk));
    callback();
  }, function(callback){
    if (!this.hasData) {
      this.push('[');
    }
    this.push("\n]\n");
    callback();
  })
}