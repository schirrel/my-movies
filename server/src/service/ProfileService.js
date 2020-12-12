const Service = require('./Service');
const SessionService = require('./SessionService');
const ProfileRepository = require('../repository/ProfileRepository');
const Profile = require('../models/Profile');

class ProfileService extends Service {
	constructor() {
		super(ProfileRepository, Profile)
	}

	validateUniqueEmail() {
		// TODO - Estou utilizando o erro do banco pela constraint de unique, mas caso de tempo vou implementar dupla validação
	}
	validateCreate(model) {
		if (!model.name) {
			throw Error('Name is required');
		}
		if (!model.user) {
			throw Error('User is required');
		}
		//User utils isDefined
		if (model.main == "undefined" || model.main == null) {
			model.main = false;
		}
	}
	async create(model) {
		this.validateCreate(model);
		return await super.create(model);
	}
	async search(params) {
		console.log(params);
		return await super.search(params);
	}
}


module.exports = ProfileService;
