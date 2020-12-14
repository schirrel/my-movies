import { uniqueId } from '@/utils/Util.js';

export default function LoadingInterceptor(api, updateRequests) {
    api.interceptors.request.use(
         (config) => {
            let requestId = uniqueId();
            config.headers['rldid'] = requestId;
            updateRequests(requestId);
            return config;
        },
        function (error) {

            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
         (response) => {
            let requestId = response.config.headers['rldid'];
            updateRequests(requestId, true);
            return response;
        },
        function (error) {
            let requestId = error.response.config.headers['rldid'];
            updateRequests(requestId, true);
            return Promise.reject(error);
        }
    );

}