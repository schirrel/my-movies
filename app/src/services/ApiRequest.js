import axios from "axios";
import Storage from "@/utils/Storage";
import { setupCache } from 'axios-cache-adapter'
import RequestObservable from '@/services/RequestObservable';

import AuthorizationInterceptor from '@/services/interceptors/AuthorizationInterceptor';
import LoadingInterceptor from '@/services/interceptors/LoadingInterceptor';
import SessionInterceptor from '@/services/interceptors/SessionInterceptor';

const cache = setupCache({
    maxAge: 1 * 60 * 1000
});

const requestCached = {
    maxAge: 15 * 60 * 1000
}

const api = axios.create({
    baseURL: "http://localhost:8081/api",
    adapter: cache.adapter
});

const ApiRequest = { api: api };
ApiRequest.observable = new RequestObservable();
console.log(ApiRequest.observable);

Storage.get("my-movie-jwt").then((token) => {
    ApiRequest.api.defaults.headers.Authorization = 'Bearer ' + token;
    AuthorizationInterceptor(ApiRequest.api, token);

});

LoadingInterceptor(ApiRequest.api, (id, remove) => {
    ApiRequest.observable.updateRequests(id, remove)
});
SessionInterceptor(ApiRequest.api);
const _get = (url, params = {}, hasCache) => {
    return ApiRequest.api.get(url, { params, cache: hasCache ? requestCached : {} });
}
const _post = (url, data) => {
    return ApiRequest.api.post(url, data);

}
const _put = (url, data) => {

    return ApiRequest.api.put(url, data);
}

const _delete = (url, data) => {
    return ApiRequest.api.delete(url, data);

}

ApiRequest.createRequest = ($url, hasCache) => {
    return {
        url: $url,
        get: (_url) => { return _get($url + _url, hasCache) },
        search: (params) => { return _get($url + '/search', params, hasCache) },
        post: (_url, data) => { return _post($url + _url, data) },
        create: (data) => { return _post($url, data) },
        update: (data) => { return _put(`${$url}/${data.id}`, data) },
        put: (_url, data) => { return _put($url + _url, data) },
        delete: (_url, data) => { return _delete($url + _url, data) }
    }

}

export const $api = api;
ApiRequest.watchRequest = callback => ApiRequest.observable.watch(callback);

export default ApiRequest;
