const Service = require('./Service');
const ReminderRepository = require('../repository/ReminderRepository');
const Reminder = require('../models/Reminder');

class ReminderService extends Service {
	constructor() {
		super(ReminderRepository, Reminder)
	}

	async create(model) {
		let result =  await super.create(model);
		return result;
	}
	async search(req) {

		let decoded = TokenService.decode(TokenService.getToken(req));
		let current =  decoded.data;


	}

}


module.exports = ReminderService;
