const {db, Campus, Student} = require('./index');
const {students, campuses} = require('./seedData');

const syncAndSeed = async() => {
  try{
    await db.sync({force:true});

    await Campus.bulkCreate(campuses).then(console.log('******Campuses Seeded******'));
    await Student.bulkCreate(students).then(console.log('******Students Seeded******'));
  }
  catch(ex){
    console.log(ex)
  }
}

module.exports = syncAndSeed