const Service = require('./Service');
const ProfileService = require('./ProfileService');
const UserRepository = require('../repository/UserRepository');
const User = require('../models/User');

module.exports = new Service(UserRepository, User);
/*
class UserService extends Service {
	constructor() {
		super(UserRepository, User);
		this.profileService = new ProfileService();
		
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
		let result =  await super.create(model);
		let entity = result.rows[0];
		let perfiPrincipal = await this.profileService.create({name:'Meu Perfil', main: true, user: entity.id});
		
		return entity;
	}
}


module.exports = UserService;
*/
// 
/*
const UserService = require('./UserService');

const TokenService = require('./TokenService');

console.log(UserService)
const service = new UserService();

class SessionService {
	static async authUser(usuario) {
		let result = await service.search({ email: usuario.email });
		if (result && result.length) {
			let found = result[0];
			if (found.password === usuario.password) {
				let chave = await TokenService.encode(found.id);
				return chave;
			} else
				throw new Error('Credenciais inválidas');
		} else
		throw new  Error('Usuario não encontrado');
	}
	static async userFromToken(token) {
		let fromToken = TokenService.decode(token);
		let user = await service.get(fromToken.data);
		return user;
	}
}

module.exports = SessionService; 
*/
