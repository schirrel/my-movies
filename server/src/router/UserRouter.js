
let router = require("express").Router();
const UserService = require('../service/UserService');

this.service = new UserService();

router.post('/', async (req, res) => {
	let dto = req.body;

	try {
		let entity = await this.service.create(dto);
		if (entity.erro) {
			res.status(500).send(entity);
		} else
			res.send(entity);
	} catch (err) {
		console.log(err);
		res.status(500).send(err.message);
	}
	return;
});


module.exports = router;