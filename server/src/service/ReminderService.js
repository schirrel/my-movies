const Service = require("./Service");
const ReminderRepository = require("../repository/ReminderRepository");
const Reminder = require("../models/Reminder");
const TokenService = require("./TokenService");
class ReminderService extends Service {
  constructor() {
    super(ReminderRepository, Reminder);
  }

  async create(model) {
    try {
      let result = await super.create(model);
      return result;
    } catch (err) {
      console.log(err);
      throw {
        erro: true,
        message: err,
      };
    }
  }
  async search(req) {
    let decoded = TokenService.decode(TokenService.getToken(req));
    let current = decoded.data;

    let result = await super.search({ profile: current });
    return result;
  }
}

module.exports = ReminderService;
