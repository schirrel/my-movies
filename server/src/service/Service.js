
const logger = require('../utils/logger');

class Service {
	constructor(repository, table) {
		if(!repository || !table) {
			throw new Error("Repository and Model are both required");
		}
		this.repository = new repository();
		this.table = table;
		this.logger = logger;
	}
	async get(id) {
		return await this.repository.get(id);
	}
	async create(model) {
		let result =  await this.repository.create(model);
		console.log(result);
		return result.rows[0];
	}
	async update(model) {
		let result =  await this.repository.update(model);
		return result.rows[0];
	}

	async delete(id) {
		// let entity = new this.table({id:id});
		// return await entity.delete();
		return await this.repository.delete(id);
	}
	async list() {
		let result = await this.repository.list();
		result = result.map(item => new this.table(item));

		return result;
	}

	async search(options) {
		let result = await this.repository.search(options);
		result = result.map(item => new this.table(item));

		return result;
	}
	async paginate(options) {
		//TODO
	}
}


module.exports = Service;