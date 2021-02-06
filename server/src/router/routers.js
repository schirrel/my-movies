const router = require("express").Router();
const Logger = require("../utils/logger");

router.use("/user", require("./UserRouter"));
router.use("/profile", require("./ProfileRouter"));
router.use("/movie", require("./MovieRouter"));
router.use(require("./SessionRouter"));
router.use("/reminder", require("./ReminderRouter"));

Logger.info("Router setted");
module.exports = router;
