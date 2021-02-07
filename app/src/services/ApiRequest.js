import axios from "axios";
import RequestObservable from "@/services/utils/RequestObservable";

import AuthorizationInterceptor from "@/services/interceptors/AuthorizationInterceptor";
import LoadingInterceptor from "@/services/interceptors/LoadingInterceptor";
import SessionInterceptor from "@/services/interceptors/SessionInterceptor";

const api = axios.create({
  //baseURL: "https://my-movies-schirrel.herokuapp.com/api",
  baseURL: "http://localhost:8080/api",
});

const observable = new RequestObservable();

const _get = (url, params = {}, customOptions = {}) =>
  api.get(url, { params, customOptions });
const _post = (url, data) => api.post(url, data);
const _put = (url, data) => api.put(url, data);
const _delete = (url, data) => api.delete(url, data);

AuthorizationInterceptor(api);
LoadingInterceptor(api, (id, remove) => {
  observable.updateRequests(id, remove);
});
SessionInterceptor(api);

export const createRequest = ($url) => {
  return {
    get: (_url) => _get($url + _url),
    search: (params, options = {}) => _get($url + "/search", params, options),
    post: (_url, data) => _post($url + _url, data),
    create: (data) => _post($url, data),
    update: (data) => _put(`${$url}/${data.id}`, data),
    put: (_url, data) => _put($url + _url, data),
    delete: (_url, data) => _delete($url + _url, data),
  };
};

export const watchRequest = (callback) => observable.watch(callback);
export const $api = api;
