const Model = require('@schirrel/pg-connection/Model');
class Movie extends Model{
	constructor(args = {}){
	super("MOVIE")
	this.addColumn('movie', 'MOVIE_ID');
	this.addColumn('watched', 'WATCHED');
	this.addColumn('profile', 'PROFILE_ID');
	this.setValues(args);
	}
}

module.exports = Movie;
