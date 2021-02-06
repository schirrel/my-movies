const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const logger = require('../utils/logger');
dotenv.config();

class TokenService {

	static async encode(userId) {
		try {
			var token =
				await jwt.sign({
					data: userId
				}, process.env.SECRET, { expiresIn: `${process.env.TOKEN_VALIDATION}` });

			return token;
		} catch (err) {

			logger.error(err)
		}

	}
	static decode(token){
		try {
		const decoded = jwt.verify(token, process.env.SECRET);
		return decoded;     
	}catch(err) {
		logger.error("error at jwt", err)
		logger.error(token);
		
	}
	}

	static getToken(req){
		const authorization = req.header('Authorization');
		return authorization ?  authorization.replace('Bearer', '').trim(): null ;
	}
}

module.exports = TokenService; 