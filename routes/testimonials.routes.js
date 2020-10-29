const express = require('express');
const router = express.Router();

// import database
const db = require('../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    const randomNumber = Math.floor(Math.random() * db.testimonials.length);
    res.json(db.testimonials[randomNumber]);
});

router.route('/testimonials/:id').get((req, res) => {
    const indexOfElement = db.testimonials.findIndex(object => object.id === parseInt(req.params.id));
    res.json(db.testimonials[indexOfElement]);
});

router.route('/testimonials/:id').put((req, res) => {

    const { author, text } = req.body;
    const indexOfElement = db.testimonials.findIndex(object => object.id === parseInt(req.params.id));

    if (req.params.id && author && text) {
        const newRecord = {
            id: req.params.id,
            author: req.body.author,
            text: req.body.text,
        };

        db.testimonials.splice((indexOfElement), 1, newRecord);

        res.json({ message: 'OK' });
    }
    else {
        res.status(400).json('Missing data to put new record');
    };
});

router.route('/testimonials').post((req, res) => {

    const { author, text } = req.body;


    if (author && text) {
        const newRecord = {
            id: Math.floor(Math.random() * 100),
            author: req.body.author,
            text: req.body.text,
        };

        db.testimonials.push(newRecord);

        res.json({ message: 'OK' });
    }
    else {
        res.status(400).json('Missing data to put new record');
    };

});

router.route('/testimonials/:id').delete((req, res) => {

    const indexOfElement = db.testimonials.findIndex(object => object.id === parseInt(req.params.id));
    db.testimonials.splice(indexOfElement, 1);

    res.json({ message: 'OK' });
});

module.exports = router; 