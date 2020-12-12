const User = require('../models/User');
const TokenService = require('./TokenService');
const UserService = require('./UserService');
const service = new UserService();

class SessionService {
	static async authUser(usuario) {
		let result = await service.search({ email: usuario.email });
		if (result && result.length) {
			let found = result[0];
			if (found.password === usuario.password) {
				let chave = await TokenService.generateKey(found.id);
				return chave;
			} else
				throw new Error('Credenciais inválidas');
		} else
		throw new  Error('Usuario não encontrado');
	}

}

module.exports = SessionService; 