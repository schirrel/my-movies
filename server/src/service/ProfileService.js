const Service = require('./Service');
const ProfileRepository = require('../repository/ProfileRepository');
const TokenService = require('../service/TokenService');
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
		if (model.main == "undefined" || model.main == null) {
			model.main = false;
		}
	}
	async create(model) {
		this.validateCreate(model);
		return await super.create(model);
	}
	async search(req) {
		let params = {};
		let decoded = TokenService.decode(TokenService.getToken(req));
		if(decoded.data) {
			params.user = decoded.data;
		}
		return await super.search(params);
	}
}


module.exports = ProfileService;
