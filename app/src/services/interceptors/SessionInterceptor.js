import Vue from "vue";
import Auth from "@/services/Auth";

export default function SessionInterceptor(api) {
    api.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status == 401 && error.config.url !== '/login') {
            Vue.$toast.error("Quem pena, sua sessão expirou!");
            setTimeout(() => {
                Auth.logout(() => {
                    window.location = '/login';
                });
            }, 300)
        }
        return Promise.reject(error);
    });
}