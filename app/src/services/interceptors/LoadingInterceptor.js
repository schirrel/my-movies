import { uniqueId } from '@/utils/Util.js';

// const requests = new Set();
// const observables = new Map();

// const watch = (observable) => {
//     let id = uniqueId();
//     observables.set(id, observable)
//     return id;
// }
// const callObservables = () => {
//     // eslint-disable-next-line no-unused-vars
//     for (var [key, value] of observables) {
//         value(!!requests.size);
//     }
// }
// const updateRequests = (id, remove) => {
//     if (remove) {
//         requests.delete(id);
//     } else {
//         requests.add(id);
//     }
//     callObservables();
// }

// export const watchRequest = callback => watch(callback);

export default function LoadingInterceptor(api, updateRequests) {
    console.log(updateRequests)
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
            return Promise.reject(error);
        }
    );

}