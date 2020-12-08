const Repository = require('@schirrel/pg-connection/Repository');
const Profile = require('../models/Profile');

class ProfileRepository extends Repository{
	constructor(){
		super(Profile);
	}
}

module.exports = ProfileRepository;
