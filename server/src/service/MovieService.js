const Service = require('./Service');
const MovieRepository = require('../repository/MovieRepository');
const Movie = require('../models/Movie');
const TMDBService = require('./TMDBService');

class MovieService extends Service {
	constructor() {
		super(MovieRepository, Movie)
	}

	validateCreate(model) {
		if (!model.movie) {
			throw Error('Movie is required');
		}
		if (!model.profile) {
			throw Error('Profile is required');
		}
		//User utils isDefined
		if (model.watched == "undefined" || model.watched == null) {
			model.watched = false;
		}
	}
	async create(model) {
		this.validateCreate(model);
		try {
			return await super.create(model);
		} catch (err) {
			return err;
		}
	}
	async myList(profile){
		let list = await super.search({profile: profile});	
		let movies = [];
		list.forEach(async(item)=>{
		let movie = await TMDBService.movie.get(item.movie);
			movies.push(movie);
		});
		
		return movies;
	
	} 
}


module.exports = MovieService;
