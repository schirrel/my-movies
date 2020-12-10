import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const api = axios.create({
    baseURL: "http://localhost:8081/api",
});

const ApiRequest = { api: api };
ApiRequest.setHeader = (header, value) => {
    ApiRequest.request.defaults.headers[header] = value;
}

const _get = (url) => {
return ApiRequest.api.get(url);
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
        get: (_url)=>{return _get($url+_url)},
        post:  (_url,data)=>{return _post($url+_url, data)},
        put:  (_url,data)=>{return _put($url+_url, data)},
        delete:  (_url, data)=>{return _delete($url+_url, data)},
        setHeader: ApiRequest.setHeader 
    }

}

export const $api = api;
export const $ApiRequest = ApiRequest;
export default createRequest;
