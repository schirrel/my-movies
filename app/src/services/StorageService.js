let STORAGE_USER = "my-movies-user";

export default class StorageService {
  static parse(val, isSet) {
    if (isSet) return JSON.stringify(val);
    return val == "undefined" || val == "null" ? null : JSON.parse(val);
  }

  static has(key) {
    return !!StorageService.parse(window.localStorage.getItem(key));
  }
  static get(key) {
    return new Promise((resolve, reject) => {
      try {
        resolve(StorageService.parse(window.localStorage.getItem(key)));
      } catch (err) {
        reject(err);
      }
    });
  }

  static set(key, value) {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.setItem(key, StorageService.parse(value, true));
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  static clear(key) {
    return new Promise((resolve, reject) => {
      try {
        if (key) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.clear();
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  static credentials() {
    return {
      has: () => {
        return this.has(STORAGE_USER);
      },
      get: () => {
        return this.get(STORAGE_USER);
      },
      set: (val) => {
        return this.set(STORAGE_USER, val);
      },
      clear: () => {
        this.clear(STORAGE_USER);
      },
    };
  }
}
