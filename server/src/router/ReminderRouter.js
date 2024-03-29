let router = require("express").Router();
let middleware = require("./middleware/AuthMiddleware");
const ReminderService = require('../service/ReminderService');

this.service = new ReminderService();


router.use(middleware);

router.post('/', async (req, res) => {
	let dto = req.body;

	try {
		let entity = await this.service.create(dto);
		if (entity.erro) {
			res.status(500).send(entity.message);
		} else
			res.send(entity);
	} catch (err) {
		res.status(500).send(err.message);
	}
	return;
});

router.get('/search', async (req, res) => {
	//TODO GET PROFILE AND DATE TODAY
	let list = await this.service.search(req);
	res.send(list);
	return;
});


module.exports = router;
