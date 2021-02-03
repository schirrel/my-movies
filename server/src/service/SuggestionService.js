const TMDBService = require('./TMDBService');
const MovieService = require('./MovieService');
const movieService = new MovieService();


const getMoviesFromSameGenres = async (genres) => {
    let suggestions = [];
   /* genres.forEach(async (genre) => {
        let suggest = await TMDBService.movies.byGenre(genre, 3);
        suggestions.push(suggest);
    });
    
    let result = await Promise.allSettled(suggestions);*/
    
    let suggest = await TMDBService.movies.byGenre(genres);
    return result;
}

const flatten = async (userList) => {
    let genres = userList.map((movie) => {
        return Array.from(movie.genres);
    });
    genres = genres.flat();
    genres = genres.sort();

    /*const genres = [...new Set(userList.map((movie)=>{
    return Array.from(movie.genres);
    }).flat().sort())];*/
    return [...new Set(genres)];
}


const getSuggestion = async (profile) => {
    let userList = await movieService.myList(profile);
    let flattenGenres = flatten(userList);
    let movies = await getMoviesFromSameGenres(flattenGenres);
    return movies;
}
