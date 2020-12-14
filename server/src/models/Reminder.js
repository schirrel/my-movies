const Model = require('@schirrel/pg-connection/Model');
class Reminder extends Model{
	constructor(args = {}){
	super("REMINDER")
	this.addColumn('movie', 'MOVIE_ID');
	this.addColumn('reminderAt', 'REMINDER_AT');
	this.addColumn('profile', 'PROFILE_ID');
	this.addColumn('date', 'DATE');  
	this.setValues(args);
	}
}

module.exports = Reminder;
