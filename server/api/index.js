'use strict'
const apiRouter = require('express').Router()

apiRouter.use('/campuses', require('./campuses'))
apiRouter.use('/students', require('./students'))

// /api + anything else
apiRouter.use('/', (req, res, next) => {
	res.status(404).send('Page Not Found')
})

module.exports = apiRouter;