const Service = require('./Service');
const UserRepository = require('../repository/UserRepository');
const User = require('../models/User');

class UserService extends Service {
	constructor() {
		super(UserRepository, User)
	}

	validateUniqueEmail() {
		// TODO - Estou utilizando o erro do banco pela constraint de unique, mas caso de tempo vou implementar dupla validação
	}
	validateCreate(model) {
		if (!model.name) {
			throw Error('Name is required');
		}
		if (!model.email) {
			throw Error('E-mail is required');
		}
		if (!model.password) {
			throw Error('Password is required');
		}
	}
	async create(model) {
		this.validateCreate(model);
		return await super.create(model);
	}
}


module.exports = UserService;