const { faker } = require('@faker-js/faker');
const {db} = require('./index');


const campuses = [...Array(200)].map(campus => (
  {
    name: faker.company.companyName(),
    imageUrl: faker.image.avatar(),
    address: faker.fake(`{{address.streetAddress}} {{address.streetSuffix}}
    {{address.city}}, {{address.state}} {{address.zipCode}}`),
    description: faker.lorem.paragraphs(4)
  }
));

const students = [...Array(500)].map(student => (
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    imageUrl: faker.image.avatar(),
    gpa:  (Math.random()*4).toFixed(2),
    campusId: Math.floor(Math.random() * (campuses.length) + 1)
  }
));

module.exports = {
  campuses,
  students
}
