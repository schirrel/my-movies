const routers = require('./router/routers');
const express = require('express');
const app = express();
var cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const logger = require('./utils/logger');

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(
    cors()
);
app.options('*', cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(function(req, res, next) {
//   if (req.headers['content-type'] === 'application/json;' || !req.headers['content-type']) {
//     req.headers['content-type'] = 'application/json';
//   }
//   next();
// });


app.use('/api',routers);
app.listen(PORT,()=>{
    logger.info(`App started at ${PORT}`);
})


app.use(express.static(__dirname + '/public'));