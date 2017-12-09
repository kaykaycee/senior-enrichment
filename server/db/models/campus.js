'use strict';
const db = require ('../index');
const Sequelize = require('sequelize');

const Campus = db.define('campuses', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	imageUrl: {
		type: Sequelize.STRING,
		defaultValue: 'https://vignette.wikia.nocookie.net/harrypotter/images/a/ae/Hogwartscrest.png/revision/latest?cb=20110806202805'
	},
	description: {
		type: Sequelize.TEXT('long')
	}
});

module.exports = Campus;