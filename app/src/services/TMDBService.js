import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "2402a694b08bf99a6cd32b20e3ce58fc";
// const apiKeyV3 ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDAyYTY5NGIwOGJmOTlhNmNkMzJiMjBlM2NlNThmYyIsInN1YiI6IjVmZDIyM2RmOGU4NzAyMDA0M2Q3ZjM5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BzCGYdrSlg0b5VK9hN51w8FmlTeLHFkcgu4hhuqgsDA"

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  config.params = {
    api_key: apiKey,
    language: "pt-BR",
    ...config.params,
  };
  return config;
});

const genres = async () => {
  let result = await api.get("genre/movie/list");
  return result.data.genres;
};

const movies = {
  popular: async (page) => {
    let result = await api.get("movie/popular", { params: { page: page } });
    return result.data;
  },
  get: async (movieId) => {
    let result = await api.get(`movie/${movieId}`);
    return result.data;
  },
  search: async (text) => {
    let result = await api.get(`search/movie`, {
      params: { page: 1, query: text },
    });
    return result.data;
  },
  byGenre: async (genres) => {
    let result = await api.get("discover/movie", {
      params: { with_genres: genres },
    });
    return result.data;
  },
};
export { genres, movies };
