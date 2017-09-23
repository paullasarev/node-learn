import { watch as fsWatch } from 'fs';
import EventEmitter from 'events';

export default class DirWatcher {
  delay_ = 0;
  emitter_ = new EventEmitter();
  DIR_CHANGE_EVENT = 'dirwatcher:changed';
  
  onWatch = (event, filename) => {
    console.log('onWatch', event, filename)
    this.watcher_.close();
    setTimeout(()=>{
      console.log('emit', this.DIR_CHANGE_EVENT,this.delay_, filename)
      this.emitter_.emit(this.DIR_CHANGE_EVENT, filename)
    }, this.delay_);
  }

  get emitter() {
    return this.emitter_;
  }

  watch(path, delay) {
    this.delay_ = delay;
    console.log('watch', path, delay)
    this.watcher_ = fsWatch(path, { recursive: true }, this.onWatch);
    return this.emitter;
  }     
}