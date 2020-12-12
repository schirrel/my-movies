
const jwt = require('jsonwebtoken');
const TokenService = require('../../service/TokenService');
const auth = async (req, res, next) => {
    try {
        const authorization = req.header('Authorization');
        if (!authorization) {
            res.status(401).send({ error: 'Please authenticate!' })
        } else {
            const token = authorization.replace('Bearer', '').trim()
            const decoded = TokenService.decode(token);
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