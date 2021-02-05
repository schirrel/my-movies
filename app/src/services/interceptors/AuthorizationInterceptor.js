import StorageService from "@/services/StorageService";
export default function AuthorizationInterceptor(api) {
  api.interceptors.request.use(
    async (config) => {
      let token = await StorageService.credentials().get();
      config.headers["Authorization"] = "Bearer " + token;
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
}
