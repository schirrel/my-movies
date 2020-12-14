const Repository = require('@schirrel/pg-connection/Repository');
const Reminder = require('../models/Reminder');

class ReminderRepository extends Repository{
	constructor(){
		super(Reminder);
	}
}

module.exports = ReminderRepository;
