let router = require("express").Router();
const SessionService = require('../service/SessionService');

router.post('/login', async (req, res) => {
	let credentials = req.body;
	let token = await SessionService.authUser(credentials);
	res.send(token);
});

module.exports = router;