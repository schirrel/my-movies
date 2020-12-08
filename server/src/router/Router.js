const LOGGER = require('../utils/logger');
const autenticacao = require('./middleware/AutenticacaoMiddleware');
/*
class Router {
	constructor(app,isAuth) {

		this.app = app;
		this.logger = LOGGER;
		if(isAuth) {
			this.app.use(autenticacao);	
		}
	}


	get(path, callback) {
		this.app.get(path,(req,res,next)=>{
			callback(req,res,next)
		});
	}

	post (path, callback){
		this.app.post(path,(req,res,next)=>{
			callback(req,res, next)
		});
	}

}

module.exports = Router;
*/



const createRouter = function (service, isAuth){
let router = require("express").Router();
	
if(isAuth) {
router.use(autenticacao);
}
	
	router.get('/search', async (req, res) => {
	let list = await this.service.search(req.query);
	res.send(list);
});
	router.get('/:id', async (req, res) => {
	let id = req.params.id;
  
	try {
		let entity = await this.service.get(id);
		if (entity.erro) {
			res.status(500).send(entity);
		} else
			res.send(entity);
	}
	catch (err){
		res.status(500).send(err);
	}
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
	return router;
}
module.exports = createRouter;
