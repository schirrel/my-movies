
const Repository = require('@schirrel/pg-connection/Repository');
const User = require('../models/User');

class UserRepository extends Repository{
	constructor(){
		super(User);
	}
}

module.exports = UserRepository;