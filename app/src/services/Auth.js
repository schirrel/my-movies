import Storage from '@/utils/Storage';
import Vue from "vue";
import {$ApiRequest, $api} from './ApiRequest';



export default class Auth {

/**
 * @param {String} value
 * @returns {Function} Promise
 */
static register(value) {
  $ApiRequest.setToken(value);
  return Storage.set('my-movie-jwt',value);
}
/**
 * @returns {Promise} Promise
 */
static unregister() {
  return  Storage.clear('my-movie-jwt');
}
/**
 * @param {Object} credentials
 * @param {Function} success
 */
  static login(credentials, success, error) {
    
  return $ApiRequest.api
    .post('/login', credentials)
    .then((response) =>{
      this.register(response.data).then((success))
    }).catch(error);
}

static loginFake(credentials, success) {

  this.register(Math.random().toString(36));
  success && success();
  
  
}

/**
 * @param {Function} success
 */
static logout(success) {
  return this.logoutFake(success);
  /*return this.unregister()
    .then(() => {
      Request.post('/auth/logout').then(success)
    })*/
}

  
static logoutFake(success) {

  this.unregister();
  success && success();
  
  
}
  
}


$api.interceptors.response.use(function (response) {
return response;
}, function (error) {
  if(error.response.status==401 && error.config.url!=='/login') {
    Vue.$toast.error("Quem pena, sua sessão expirou!");
    setTimeout(()=>{  
      Auth.logout(()=>{    
        window.location = '/login';
      });
    },300)
  }
return Promise.reject(error);
});
