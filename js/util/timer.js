import initialState from '../data/initial-state';

class Timer {
  constructor() {
    this._listeners = new Set();
    this._time = initialState.time;
  }

  get time() {
    return this._time;
  }

  start() {
    this.timer = setInterval(() => {
      this._time--;
      this._notifyAll();
    }, 1000);
  }

  stop() {
    this._time = initialState.time;
    this._removeAll();
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  addListener(listener) {
    if (!(listener instanceof Function)) {
      throw new Error(`listener should be a function`);
    }
    this._listeners.add(listener);
  }

  _removeAll() {
    this._listeners.clear();
  }

  _notifyAll() {
    this._listeners.forEach((listener) => {
      listener(this._time);
    });
  }
}

export default new Timer();
