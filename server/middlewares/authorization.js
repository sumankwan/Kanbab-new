const { Task } = require('../models/index.js')

function authorization (req, res, next) {
    Task.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            
            if(!data) {
                throw ({msg: 'Task is not found'})
            } else if (data.UserId == req.userData.id) {
                next()
            } else {
                throw ({msg: 'you are not authorized'})
            }
        })
        .catch(err => [
            res.status(401).json({errors: err})
        ])
}

module.exports = {authorization}