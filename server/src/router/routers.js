
const router = require("express").Router();
const logger = require('../utils/logger');

router.use('/user', require("./UserRouter"))
router.use(require("./SessionRouter"))


logger.info('Router setted');
module.exports = router;
