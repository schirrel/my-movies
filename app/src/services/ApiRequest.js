import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const api = axios.create({
    baseURL: "http://localhost:8000/api",
});

const ApiRequest = { request: api };
ApiRequest.setHeader = (header, value) => {
    ApiRequest.request.defaults.headers[header] = value;
}

const _get = (url) => {
return ApiRequest.get(url);
}
const _post = (url, data) => {
    return ApiRequest.post(url, data);

}
const _put = (url, data) => {

    return ApiRequest.put(url, data);
}

const _delete = (url, data) => {
    return ApiRequest.delete(url, data);

}

function createRequest(url) {
console.log(url);
    return {
        get: _get,
        post: _post,
        put: _put,
        delete: _delete,
        setHeader: ApiRequest.setHeader 
    }

}
export default createRequest;