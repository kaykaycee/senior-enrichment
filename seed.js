'use strict'; 

const db = require('./server/db/models')
const Campus = require('./server/db/models/campus')
const Student = require('./server/db/models/student')

const campuses = [
  {
    id: 1,
    name: 'Gryffindor',
    imageUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/8/8e/0.31_Gryffindor_Crest_Transparent.png/revision/latest?cb=20161124074004',
    description: 'House of Godric Gryffindor'
  }, 
  {
    id: 2,
    name: 'Hufflepuff',
    imageUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/5/50/0.51_Hufflepuff_Crest_Transparent.png/revision/latest?cb=20161020182518',
    description: 'House of Helga Hufflepuff'
  },
  {
    id: 3,
    name: 'Ravenclaw',
    imageUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/2/29/0.41_Ravenclaw_Crest_Transparent.png/revision/latest?cb=20161020182442',
    description: 'House of Rowena Ravenclaw'
  },
  {
    id: 4,
    name: 'Slytherin',
    imageUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/d/d3/0.61_Slytherin_Crest_Transparent.png/revision/latest?cb=20161020182557',
    description: 'House of Salazar Slytherin'
  }
];

const students = [
  {
    firstName: 'Harry',
    lastName: 'Potter',
    email: 'hp@gmail.com',
    gpa: 3.6,
    campusId: 1
  },
  {
    firstName: 'Hermione',
    lastName: 'Granger',
    email: 'hg@gmail.com',
    gpa: 3.6,
    campusId: 1
  },
  {
    firstName: 'Ron',
    lastName: 'Weasley',
    email: 'rw@gmail.com',
    gpa: 3.6,
    campusId: 1
  },
  {
    firstName: 'Cedric',
    lastName: 'Diggory',
    email: 'cd@gmail.com',
    gpa: 3.6,
    campusId: 2
  },
  {
    firstName: 'Luna',
    lastName: 'Lovegood',
    email: 'll@gmail.com',
    gpa: 3.6,
    campusId: 3
  },
  {
    firstName: 'Cho',
    lastName: 'Chang',
    email: 'cc@gmail.com',
    gpa: 3.6,
    campusId: 3
  },
  {
    firstName: 'Draco',
    lastName: 'Malfoy',
    email: 'rw@gmail.com',
    gpa: 3.6,
    campusId: 4
  }
]

const seed = () =>
  Promise.all(campuses.map(campus =>
    Campus.create(campus))
  )
  .then(() =>
  Promise.all(students.map(student =>
    Student.create(student))
  )
);

const main = () => {
  console.log('Syncing database...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding database...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();