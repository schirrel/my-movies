const TMDBService = require("./TMDBService");
const MovieService = require("./MovieService");
const movieService = new MovieService();
const arrayUtils = require("../utils/arrays");

const getMoviesFromSameGenres = async (genres) => {
  let suggestions = [];
  /* genres.forEach(async (genre) => {
        let suggest = await TMDBService.movies.byGenre(genre, 3);
        suggestions.push(suggest);
    });
    
    let result = await Promise.allSettled(suggestions);*/

  let suggest = await TMDBService.movies.byGenre(genres);
  return suggest;
};

const flatten = async (userList) => {
  let genres = userList.map((movie) => {
    let genres = movie.genres;
    if (genres) {
      genres = genres.replace("{", "[");
      genres = genres.replace("}", "]");

      return Array.from(JSON.parse(genres));
    }
    return null;
  });
  genres = arrayUtils.flatten(genres);
  genres = genres.sort();
  return [...new Set(genres)];
};

const getSuggestion = async (profile) => {
  let userList = await movieService.search({ profile: profile });
  let flattenGenres = await flatten(userList);
  let genres = flattenGenres.filter((v) => {
    return v && parseInt(v);
  });
  genres = genres.join(",");
  let movies = await getMoviesFromSameGenres(genres);
  return movies;
};

module.exports = getSuggestion;
