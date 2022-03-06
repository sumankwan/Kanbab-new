const { Task } = require('../models/index.js')
const { User } = require('../models/index.js')

class taskController {
    static create (req, res, next) {
        Task.create({
                title: req.body.title,
                category: req.body.category,
                UserId: req.userData.id
            })
            .then(data => {
                res.status(200).json({task: data})
            })
            .catch(err => {
                next(err)
            })
    }

    static findAll (req, res, next) {
        Task.findAll({include: [{model: User}]})
            .then(data => {
                res.status(200).json({tasks: data})
            })
            .catch(err => {
                next(err)
            })
    }

    static delete (req, res, next) {
        Task.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                res.status(200).json({msg: 'successsfully deleted'})
            })
            .catch(err => {
                next(err)
            })
    }

    static update (req, res, next) {
        Task.update({
                title: req.body.title,
                category: req.body.category
            }, {
                where: {
                    id: req.params.id
                }
            , returning: true})
            .then(data => {
                res.status(200).json({task: data[1]})
            })
            .catch(err => {
                next(err)
            })
    }

    static findOne (req, res, next) {
        Task.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                res.status(200).json({task: data})
            })
            .catch(err => {
                next(err)
            })
    }

    static updateCategory (req, res, next) {
        Task.update({
                category: req.body.category
                }, { where: {
                    id: req.params.id
                }
            })
            .then(data => {
                res.status(200).json({task: data})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = {taskController}