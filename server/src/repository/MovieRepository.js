const Repository = require('@schirrel/pg-connection/Repository');
const Movie = require('../models/Movie');

class MovieRepository extends Repository{
	constructor(){
		super(Movie);
	}
}

module.exports = MovieRepository;
