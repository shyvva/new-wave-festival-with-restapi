const express = require('express');
const router = express.Router();

// import database
const db = require('../db.js');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
    const randomNumber = Math.floor(Math.random() * db.seats.length)
    res.json(db.seats[randomNumber]);
});

router.route('/seats/:id').get((req, res) => {
    const indexOfElement = db.seats.findIndex(object => object.id === parseInt(req.params.id));

    res.json(db.seats[indexOfElement]);
});

router.route('/seats/:id').put((req, res) => {

    const { day, seat, client, email } = req.body;
    const { id } = req.params;

    const indexOfElement = db.seats.findIndex(object => object.id === parseInt(req.params.id));

    if (id && day && seat && client && email) {
        const newRecord = {
            id, day, seat, client, email
        };

        db.seats.splice((indexOfElement), 1, newRecord);

        res.json({ message: 'OK' });
    }
    else {
        res.status(400).json('Missing data to put new record')
    }
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = Math.floor(Math.random() * 100);

    if (!db.seats.some(item => item.day == day && item.seat == seat)) {
        const newRecord = {
            id, day, seat, client, email
        };

        res.json(db.seats.push(newRecord));
    } else {
        res.status(409).json({ message: 'The slot is already taken' })
    };
});

router.route('/seats/:id').delete((req, res) => {

    const indexOfElement = db.seats.findIndex(object => object.id === parseInt(req.params.id));
    db.seats.splice(indexOfElement, 1);

    res.json({ message: 'OK' });
});

module.exports = router;
