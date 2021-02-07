import StorageService from "../StorageService.js";
import { $api } from "../ApiRequest";

export default class Auth {
  /**
   * @param {String} value
   * @returns {Function} Promise
   */
  static register(value) {
    return StorageService.credentials().set(value);
  }
  /**
   * @returns {Promise} Promise
   */
  static unregister() {
    return StorageService.credentials().clear();
  }
  /**
   * @param {Object} credentials
   * @param {Function} success
   */
  static login(credentials, success, error) {
    return $api
      .post("/login", credentials)
      .then((response) => {
        Auth.register(response.data).then(success);
      })
      .catch(error);
  }

  /**
   * @param {Function} success
   */
  static logout(success) {
    return this.unregister().then(() => {
      $api.post("/auth/logout").then(success);
    });
  }

  static guard(to, from, next) {
    if (to.meta && to.meta.loading) {
      window.Pace.start({ elements: false, document: false });
    }
    const isSecure = to.matched.some((route) => route.meta.secure);
    if (!isSecure) return next();
    if (StorageService.credentials().has()) {
      next();
    } else {
      if (from.name != "login") {
        next({
          path: "/login",
          params: { nextUrl: to.fullPath },
        });
      }
    }
  }
}
