'use strict';
const db = require('../index');

// REQUIRE ALL MODELS
const Student = require('./student');
const Campus = require('./campus');

// ASSOCIATIONS & HOOKS
Campus.hasMany(Student, { onDelete: 'cascade', hooks: true });
Student.belongsTo(Campus);

module.exports = db;