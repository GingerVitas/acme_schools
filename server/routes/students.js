const router = require('express').Router();
const Student = require('../database/Student');


router.get('/', async(req, res, next) =>{
  try{
    res.send(await Student.findAll())
  }
  catch(ex){
    next(ex)
  }
});

router.post('/', async(req, res, next) => {
  try{
    const student = await Student.create(req.body);
    res.status(201).send(student);
  }
  catch(ex){
    next(ex)
  }
})

router.put('/:id', async(req, res, next) => {
  try{
    const updatedStudent = await Student.findByPk(req.params.id);
    res.send(await updatedStudent.update(req.body));
  }
  catch(ex){
    next(ex)
  }
})

module.exports = router;