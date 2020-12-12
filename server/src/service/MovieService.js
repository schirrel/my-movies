const Service = require('./Service');
const MovieRepository = require('../repository/MovieRepository');
const Movie = require('../models/Movie');

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
		model.watched= false;
		}
	}
	async create(model) {
		this.validateCreate(model);
		return await super.create(model);
	}
}


module.exports = MovieService;
