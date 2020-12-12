import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:8081/api",
});
const ApiRequest = { api: api };
ApiRequest.setToken = (value) => {
    ApiRequest.api.defaults.headers.Authorization = 'Bearer ' + value;
}

const _get = (url, params={}) => {
    return ApiRequest.api.get(url, { params });
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

function createRequest($url) {
    return {
        url: $url,
        get: (_url) => { return _get($url + _url) },
        search: (params) => { return _get($url+'/search', params) },
        post: (_url, data) => { return _post($url + _url, data) },
        save: (data) => { return _post($url, data) },
        put: (_url, data) => { return _put($url + _url, data) },
        delete: (_url, data) => { return _delete($url + _url, data) },
        setToken: ApiRequest.setToken
    }

}

export const $api = api;
export const $ApiRequest = ApiRequest;
export default createRequest;
