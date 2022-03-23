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



module.exports = router;