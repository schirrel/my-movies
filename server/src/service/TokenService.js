const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class TokenService {

	static async encode(userId) {
		try {
			console.log(`${process.env.TOKEN_VALIDATION}`)
			var token =
				await jwt.sign({
					data: userId
				}, process.env.SECRET, { expiresIn: `${process.env.TOKEN_VALIDATION}` });

			return token;
		} catch (err) {

			console.log(err)
		}

	}
	static decode(token){
		const decoded = jwt.verify(token, process.env.SECRET);
		return decoded;     
	}

	static getToken(req){
		const authorization = req.header('Authorization');
		return authorization ?  authorization.replace('Bearer', '').trim(): null ;
	}
}

module.exports = TokenService; 