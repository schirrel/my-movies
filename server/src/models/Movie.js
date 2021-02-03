const Model = require('@schirrel/pg-connection/Model');
class Movie extends Model{
	constructor(args = {}, fromDatabase){
	super("MOVIE")
	this.addColumn('movie', 'MOVIE_ID');
	this.addColumn('watched', 'WATCHED');
	this.addColumn('profile', 'PROFILE_ID');
	this.addColumn('genres', 'GENRE_IDS'); 
	this.setValues(args, fromDatabase);
	}
}

module.exports = Movie;
