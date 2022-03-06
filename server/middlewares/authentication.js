const { User } = require('../models/index.js')
const verifyToken = require('../helpers/jwt.js').verifyToken

function authentication (req, res, next) {
    let decoded = verifyToken(req.headers.token)
    User.findOne({
            where: {
                id: decoded.id
            }
        })
        .then(data => {
            if(!data) {
                throw ({msg: 'authentication failed'})
            } else {
                req.userData = decoded
                next()
            }
        })
        .catch(err => {
            res.status(401).json({errors: err})
        })
}

module.exports = {authentication}