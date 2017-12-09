const apiRouter = require('express').Router()
const db = require('../db')
const Campus = require('../db/models/campus')

// GET
// all campuses
apiRouter.get('/', (req, res, next) => {
	Campus.findAll()
		.then(campus => res.json(campus))
		.catch(next)
})

// a campus by id
apiRouter.get('/:campusId', (req, res, next) => {
	Campus.findById(req.params.campusId)
		.then(campus => res.json(campus))
		.catch(next)
})

// POST
// a new campus
apiRouter.post('/', (req, res, next) => {
	Campus.create(req.body)
		.then(campus => res.status(201).json(campus))
		.catch(next)
})

// PUT
// updated campus info for one campus
apiRouter.put('/:campusId', (req, res, next) => {
	Campus.findById(req.params.campusId)
		.then(campus => campus.update(req.body))
		.then(updatedCampus => res.json(updatedCampus))
		.catch(next)
})

// DELETE
// a campus
apiRouter.delete('/:campusId', (req, res, next) => {
	Campus.destroy({ where: { id: req.params.campusId } })
		.then(() => res.status(204).end())
		.catch(next)
})

module.exports = apiRouter;