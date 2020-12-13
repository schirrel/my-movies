export default function AuthorizationInterceptor(api, token){
    api.interceptors.request.use(
        config => {
            if (token && config.url !== '/login' && !config.headers['Authorization']) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );
}