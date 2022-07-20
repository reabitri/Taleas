const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Student = require('../models/std');

router.get('/', (req, res, next) => {
    Student.find()
    .exec()
    .then(docs => {
        console.log(docs);
       
            res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post("/", (req, res, next) => {
    const std = new Student({
        _id: new mongoose.Types.ObjectId(),
        Name: req.body.Name,
        Department: req.body.Department,
        Age: req.body.Age
    });
    std
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message:"Post request",
            createdStd: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    
    });
});


router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Student.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message: 'No valid entry for provided ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});

});
});


router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Student.updateOne({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
});


router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Student.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    });

module.exports = router;