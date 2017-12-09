const apiRouter = require('express').Router()
const Student = require('../db/models/student')

// GET
// all students
apiRouter.get('/', (req, res, next) => {
	Student.findAll({ include: [{ all: true }] })
		.then(student => res.json(student))
		.catch(next)
})

// a student by id
apiRouter.get('/:studentId', (req, res, next) => {
	Student.findById(req.params.studentId, { include: [{ all: true }] })
		.then(student => res.json(student))
		.catch(next)
})

// POST
// a new student
apiRouter.post('/', (req, res, next) => {
	Student.create(req.body)
		.then(student => res.status(201).json(student))
		.catch(next)
})

// PUT
// updated student info for one student
apiRouter.put('/:studentId', (req, res, next) => {
	Student.findById(req.params.studentId)
		.then(student => student.update(req.body))
		.then(updatedStudent => res.json(updatedStudent))
		.catch(next)
})

// DELETE
// a student
apiRouter.delete('/:studentId', (req, res, next) => {
	Student.destroy({ where: { id: req.params.studentId } })
		.then(() => res.status(204).end())
		.catch(next)
})

module.exports = apiRouter;