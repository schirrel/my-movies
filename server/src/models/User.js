
const Model = require('pg-connection/Database/Model');
class User extends Model{
	constructor(args = {}){
	super("USER")
	this.addColumn('email', 'EMAIL');
	this.addColumn('nome', 'NAME');
	this.addColumn('password', 'PASSWORD');
	this.addColumn('birthday', 'BIRTHDAY');
	this.setValues(args);
	}
}

module.exports = User;