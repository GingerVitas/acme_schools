const router = require('express').Router();
const Campus = require('../database/Campus');


router.get('/', async(req, res, next) =>{
  try{
    res.send(await Campus.findAll());
  }
  catch(ex){
    next(ex)
  }
});

router.get('/:id', async(req, res, next) => {
  try{
    res.send(await Campus.findByPk(req.params.id));
  }
  catch(ex){
    next(ex)
  }
});

router.post('/', async(req, res, next) => {
  try{
    const newCampus = await Campus.create(req.body);
    res.status(201).send(newCampus);
  }
  catch(ex){
    next(ex)
  }
});

router.delete('/:id', async(req, res, next) => {
  try{
    const campus = await Campus.findByPk(req.params.id);
    await campus.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex)
  }
});

router.put('/:id', async(req, res, next) => {
  try{
    const updatedCampus = await Campus.findByPk(req.params.id);
    res.send(await updatedCampus.update(req.body))
  }
  catch(ex){
    next(ex)
  }
})


module.exports = router;