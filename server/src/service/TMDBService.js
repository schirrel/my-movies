const axios = require("axios");


const baseUrl ="https://api.themoviedb.org/3";
const apiKey = "2402a694b08bf99a6cd32b20e3ce58fc";

const api = axios.create({
    baseURL: baseUrl
});

api.interceptors.request.use(config => {
    config.params = {
        api_key: apiKey,
        ...config.params,
    };
    return config;
  })
  
  const genres =  async () => {
        let result = await api.get('genre/movie/list');
        return result.data.genres;      
}

const movies = {
 
    popular:  async (page) => {
        let result = await api.get('movie/popular',{page:page});
        return result.data;      
    },get : async(movieId) => {
        let result = await api.get(`movie/${movieId}`);
            return result.data;      
    },
    byGenre: async(genres) => {
        let result = await api.get('movie/discover',{with_genres:genres});
        return result.data;      
    }
}

module.exports = {
    genres, movies
}
