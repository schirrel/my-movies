import axios from "axios";
import RequestObservable from "@/services/RequestObservable";

import AuthorizationInterceptor from "@/services/interceptors/AuthorizationInterceptor";
import LoadingInterceptor from "@/services/interceptors/LoadingInterceptor";
import SessionInterceptor from "@/services/interceptors/SessionInterceptor";

const api = axios.create({
  //baseURL: "https://my-movies-schirrel.herokuapp.com/api",
  baseURL: "http://localhost:8080/api",
});

const ApiRequest = { api: api };
ApiRequest.observable = new RequestObservable();

AuthorizationInterceptor(ApiRequest.api);
LoadingInterceptor(ApiRequest.api, (id, remove) => {
  ApiRequest.observable.updateRequests(id, remove);
});
SessionInterceptor(ApiRequest.api);

const _get = (url, params = {}, customOptions = {}) => {
  return ApiRequest.api.get(url, { params, customOptions });
};
const _post = (url, data) => {
  return ApiRequest.api.post(url, data);
};
const _put = (url, data) => {
  return ApiRequest.api.put(url, data);
};

const _delete = (url, data) => {
  return ApiRequest.api.delete(url, data);
};

ApiRequest.createRequest = ($url) => {
  return {
    url: $url,
    get: (_url) => {
      return _get($url + _url);
    },
    search: (params, options = {}) => {
      return _get($url + "/search", params, options);
    },
    post: (_url, data) => {
      return _post($url + _url, data);
    },
    create: (data) => {
      return _post($url, data);
    },
    update: (data) => {
      return _put(`${$url}/${data.id}`, data);
    },
    put: (_url, data) => {
      return _put($url + _url, data);
    },
    delete: (_url, data) => {
      return _delete($url + _url, data);
    },
  };
};

export const $api = api;
ApiRequest.watchRequest = (callback) => ApiRequest.observable.watch(callback);

export default ApiRequest;
