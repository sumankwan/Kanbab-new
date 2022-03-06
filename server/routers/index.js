const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication.js').authentication
const errHandler = require('../middlewares/errHandler').errHandler
const usersRouter = require('./users.js').router
const tasksRouter = require('./tasks.js').router

router.use('/', usersRouter)

router.use(authentication)

router.use('/tasks', tasksRouter)

router.use(errHandler)

module.exports = {router}