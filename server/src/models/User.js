
const Model = require('@schirrel/pg-connection/Model');
class User extends Model{
	constructor(args = {}){
	super("USER")
	this.addColumn('email', 'EMAIL');
	this.addColumn('name', 'NAME');
	this.addColumn('password', 'PASSWORD');
	this.addColumn('birthday', 'BIRTHDAY');
	this.addColumn('facebookId', 'FACEBOOK_ID');
	this.setValues(args);
	}
}

module.exports = User;