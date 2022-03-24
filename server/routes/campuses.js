const router = require('express').Router();
const Campus = require('../database/Campus');


router.get('/', async(req, res, next) =>{
  try{
    res.send(await Campus.findAll())
  }
  catch(ex){
    next(ex)
  }
})

router.get('/:id', async(req, res, next) => {
  try{
    res.send(await Campus.findByPk(req.params.id))
  }
  catch(ex){
    next(ex)
  }
})

router.post('/', async(req, res, next) => {
  try{
    const newCampus = await Campus.create(req.body);
    res.status(201).send(newCampus)
  }
  catch(ex){
    next(ex)
  }
})


module.exports = router;