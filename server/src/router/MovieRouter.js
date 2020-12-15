let router = require("express").Router();
let middleware = require("./middleware/AuthMiddleware");
const MovieService = require('../service/MovieService');

this.service = new MovieService();

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
	let list = await this.service.search(req.query);
	res.send(list);
	return;
});
router.get('/:id/list', async (req, res) => {
	let id = req.params.id;
	let list = await this.service.myList(id);
	res.send(list);
	return;
});
router.put('/:id', async (req, res) => {
	let id = req.params.id;
	let dto = req.body;

	try {
		let entity = await this.service.update(dto, id);

		if (entity.erro) {
			res.status(500).send(entity);
		} else
			res.send(entity);
	}
	catch (err) {
		res.status(500).send(err);
	}
	return;
});

// CREATED SET WATCHED AND WATCH REMINDER

module.exports = router;
