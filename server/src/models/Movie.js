const Model = require('@schirrel/pg-connection/Model');
class Movie extends Model{
	constructor(args = {}){
	super("MOVIE")
	this.addColumn('movieId', 'MOVIE_ID');
	this.addColumn('watched', 'MAIN');
	this.addColumn('profile', 'PROFILE');
	this.setValues(args);
	}
}

module.exports = Movie;
