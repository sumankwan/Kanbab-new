const express = require('express')
const router = express.Router()
const authorization = require('../middlewares/authorization.js').authorization
const taskController = require('../controllers/taskController.js').taskController

router.post('/', taskController.create)
router.get('/', taskController.findAll)
router.get('/:id', authorization, taskController.findOne)
router.delete('/delete/:id', authorization, taskController.delete)
router.put('/update/:id', authorization, taskController.update)
router.patch('/updateCategory/:id', authorization, taskController.updateCategory)

module.exports = {router}