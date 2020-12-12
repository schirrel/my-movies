
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const auth = async (req, res, next) => {
    try {
        const authorization = req.header('Authorization');
        if (!authorization) {
            res.status(401).send({ error: 'Please authenticate!' })
        } else {
            const token = authorization.replace('Bearer', '').trim()
            const decoded = jwt.verify(token, process.env.SECRET);
            console.log(decoded);            
        }
        next()
    } catch (error) {
        //TODO IMPLEMENT TOKEN EXPIRED RETURN
        console.log('Erro')
        console.log(error)
        res.status(401).send({ error: 'Please authenticate!' })
    }
}

module.exports = auth