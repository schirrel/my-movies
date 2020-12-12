
const router = require("express").Router();
const logger = require('../utils/logger');

router.use('/user', require("./UserRouter"));
router.use('/profile', require("./ProfileRouter"));
router.use('/movie', require("./MovieRouter"))
router.use(require("./SessionRouter"));


logger.info('Router setted');
module.exports = router;
