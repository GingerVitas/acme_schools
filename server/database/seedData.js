const { faker } = require('@faker-js/faker');
const campuses = [...Array(5)].map(campus => (
  {
    name: faker.company.companyName(),
    imageUrl: faker.image.image(),
    address: faker.fake(`{{address.streetAddress}} {{address.streetSuffix}}
    {{address.city}}, {{address.state}} {{address.zipCode}}`),
    description: faker.lorem.paragraphs(4)
  }
));

const students = [...Array(20)].map(student => (
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    imageUrl: faker.image.avatar(),
    gpa:  (Math.random()*4).toFixed(2),
    campusId: Math.floor(Math.random() * 5 + 1)
  }
));

module.exports = {
  campuses,
  students
}
