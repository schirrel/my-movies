let router = require("express").Router();
let middleware = require("./middleware/AuthMiddleware");
const ProfileService = require('../service/ProfileService');

this.service = new ProfileService();

router.use(middleware);

router.post('/', async (req, res) => {
	let dto = req.body;

	try {
	let entity = await  this.service.create(dto);	
	if(entity.erro) {
		res.status(500).send(entity);
	} else	
	res.send(entity);
} catch(err) {
	res.status(500).send(err.message);
}
});

router.get('/search', async (req, res) => {
	let list = await this.service.search(req);
	res.send(list);
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
	catch (err){
		res.status(500).send(err);
	}
});

module.exports = router;
