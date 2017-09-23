import { watch as fsWatch } from 'fs';
import EventEmitter from 'events';

export default class DirWatcher {
  DIR_CHANGE_EVENT = 'dirwatcher:changed';

  delay_ = 0;
  emitter_ = new EventEmitter();
  watcher_ = null;
  
  close() {
    if (this.watcher_) {
      this.watcher_.close();
      this.watcher_ = null;
    }
  }

  on(event, listener) {
    this.emitter_.on(event, listener);
  }

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