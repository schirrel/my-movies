const Service = require('./Service');
const UserRepository = require('../repository/UserRepository');

class UserService extends Service {
	constructor () {
		super(UserRepository)
	}
}


module.exports = UserService;