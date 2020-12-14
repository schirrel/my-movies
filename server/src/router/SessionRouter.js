let router = require("express").Router();
const SessionService = require('../service/SessionService');

router.post('/login', async (req, res) => {
	let credentials = req.body;
	try {

		let token = await SessionService.authUser(credentials);
		res.send(token);
	} catch (err) {
		res.status(401).send(err.message)
	}
	return;
});


module.exports = router;