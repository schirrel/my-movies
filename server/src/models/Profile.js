const Model = require('@schirrel/pg-connection/Model');
class Profile extends Model{
	constructor(args = {}){
	super("PROFILE")
	this.addColumn('name', 'NAME');
	this.addColumn('main', 'MAIN');
	this.addColumn('user', 'USER_ID');
	this.setValues(args);
	}
}

module.exports = Profile;
