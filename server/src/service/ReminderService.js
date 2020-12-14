const Service = require('./Service');
const ReminderRepository = require('../repository/ReminderRepository');
const Reminder = require('../models/Reminder');

class ReminderService extends Service {
	constructor() {
		super(ReminderRepository, Reminder)
	}

	async create(model) {
		model.data = new Date();
		let result =  await super.create(model);
		let entity = result.rows[0];
		return entity;
	}
}


module.exports = ReminderService;
