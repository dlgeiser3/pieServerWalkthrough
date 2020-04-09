// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const Pie = require('../db').import('../models/pie')


// router.get('/', (req, res) => res.send('Pies are super great!!'));

router.get('/', (req, res) =>{
  Pie.findAll()
    .then(pie => res.status(200).json(pie))
    .catch(err => res.status(500).json({
      error:err
    }))
})


router.post('/', (req, res) => {
  const pieFromRequest = {
    nameOfPie: req.body.nameOfPie,
    baseOfPie: req.body.baseOfPie,
    crust: req.body.crust,
    timeToBake: req.body.timeToBake,
    servings: req.body.servings,
    rating: req.body.rating
  }
  Pie.create(pieFromRequest)
    .then(pie => res.status(200).json(pie))
    .catch(err => res.json(req.errors))
})



router.get('/:name', (req, res) => {
  Pie.findOne({ where: { nameOfPie: req.params.name }})
    .then(pie => res.status(200).json(pie))
    .catch(err => res.status(500).json({ error: err}))
})


router.put('/:id', (req, res) => {
  Pie.update(req.body, { where: 
    { id: req.params.id },
  returning: true})
    .then(pie => res.status(200).json(pie))
    .catch(err => res.json({
      error: err
    }))
})


router.delete('/:id', (req, res) =>{
  Pie.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(pie => res.status(200).json(pie))
  .catch(err => res.json({
    error: err
  }))
})



module.exports = router;