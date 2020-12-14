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
	async create(req) {
		let model = req.body;
		let decoded = TokenService.decode(TokenService.getToken(req));
		if (decoded.data) {
			model.user = decoded.data;
		}
		this.validateCreate(model);
		return await super.create(model);
	}
	async search(req, customParams = {}) {
		let params = customParams;
		let decoded = TokenService.decode(TokenService.getToken(req));
		if (decoded && decoded.data) {
			params.user = decoded.data;
			return await super.search(params);
		} else {
			throw new Error('User required')
		}
	}
	async main(req) {

		let decoded = TokenService.decode(TokenService.getToken(req));
		let current = await super.search({ user: decoded.data, main: true });
		current.forEach(async (profile) => {
			profile.main = false;
			await super.update(profile);
		});

		let toUpdate = await this.get(parseInt(req.params.id));
		toUpdate.main = true;

		let result = await super.update(toUpdate);
		if (result.main) {
			return result;
		} else {
			throw new Error("Ocorreu um erro ao atualizar perfil principal");
		}



	}
}


module.exports = ProfileService;
