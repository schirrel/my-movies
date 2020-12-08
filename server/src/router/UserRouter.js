
let router = require("express").Router();
const UserService = require('../service/UserService');

this.service = new UserService();

router.post('/', async (req, res) => {
	let dto = req.body;

	let entity = await  this.service.save(dto);	
	if(entity.erro) {
		res.status(500).send(entity);
	} else	
	res.send(entity);
});


module.exports = router;