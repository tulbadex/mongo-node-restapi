const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of data from the db
router.get('/ninjas', (req, res, next) => {
    /* Ninja.findMany({}).then((ninjas) => {
        // res.send({type: 'GET'});
        res.send(ninjas);
    }); */

    /* Ninja.geoNear({
        type: 'Point',
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
    },
    {
        maxDistance: 100000, 
        spherical: true
    }).then( (ninjas) => {
        res.send(ninjas);
    }).catch(next); */

    /* Ninja.aggregate().near({
        near: {
            type: 'Point',
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000, 
        spherical: true,
        distanceField: "dist.calculated"
    }).then( (ninjas) => {
        res.send(ninjas);
    }).catch(next); */

    Ninja.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
                distanceField: "dist.calculated",
                maxDistance: 100000, 
                spherical: true
            }
        }
    ]).then( (ninjas) => {
        res.send(ninjas);
    }).catch(next);

});

// add data to the database
router.post('/ninjas', (req, res, next) => {
    // console.log(req.body);
    /* var ninja = new Ninja(req.body);
    ninja.save(); */
    // or
    Ninja.create(req.body).then( (ninja) => {
        res.send(ninja);
    }).catch(next);

    /* res.send({
        type: 'POST',
        name: req.body.name,
        rank: req.body.rank
    }); */
});

// update data in the database
router.put('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then( () => {
        Ninja.findOne({_id: req.params.id}).then( (ninja) => {
            res.send(ninja);
        });
    });
    // res.send({type: 'PUT'});
});

// delete data from the database
router.delete('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndRemove({_id: req.params.id}).then((ninja) => {
        res.send(ninja);
    });
    // res.send({type: 'DELETE'});
});

module.exports = router;