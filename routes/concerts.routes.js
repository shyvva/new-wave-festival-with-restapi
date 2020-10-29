const express = require('express');
const router = express.Router();

// import database
const db = require('../db.js');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
    const randomNumber = Math.floor(Math.random() * db.concerts.length)
    res.json(db.concerts[randomNumber]);
});

router.route('/concerts/:id').get((req, res) => {
    const indexOfElement = db.concerts.findIndex(object => object.id === parseInt(req.params.id));
    res.json(db.concerts[indexOfElement]);
});

router.route('/concerts/:id').put((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const { id } = req.params;
    const indexOfElement = db.concerts.findIndex(object => object.id === parseInt(req.params.id));

    if (id && performer && genre && price && day && image) {
        const newRecord = {
            id, performer, genre, price, day, image
        };

        db.concerts.splice((indexOfElement), 1, newRecord);

        res.json({ message: 'OK' });
    }
    else {
        res.status(400).json('Missing data to put new record')
    }
});

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const id = Math.floor(Math.random() * 100)

    if (id && performer && genre && price && day && image) {
        const newRecord = {
            id, performer, genre, price, day, image
        };

        db.concerts.push(newRecord);

        res.json({ message: 'OK' });
    }
    else {
        res.status(400).json('Missing data to put new record')
    }
});

router.route('/concerts/:id').delete((req, res) => {
    const indexOfElement = db.concerts.findIndex(object => object.id === parseInt(req.params.id));
    db.concerts.splice(indexOfElement, 1);

    res.json({ message: 'OK' });
});

module.exports = router;