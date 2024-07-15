//matan itzhaki, 315529719
//ofek ezra, 20849336
//ido michael barnea, 316315837

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Calorie = require('../models/Calorie');

// Custom Exception
function ApiException(message, code) {
    this.message = message;
    this.code = code;
}

ApiException.prototype = new Error();

// Add a new calorie consumption item
router.post('/addcalories', async (req, res) => {
    try {
        const { user_id, year, month, day, description, category, amount } = req.body;
        if (!user_id || !year || !month || !day || !description || !category || !amount) {
            throw new ApiException('Missing required fields', 400);
        }
        const calorie = new Calorie(
            { user_id, year, month, day, description, category, amount });
        await calorie.save();
        res.status(201).send(calorie);
    } catch (err) {
        if (err instanceof ApiException) {
            res.status(err.code).send({ error: err.message });
        } else {
            res.status(400).send(err);
        }
    }
});

// Get user details
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get detailed report
router.get('/report', async (req, res) => {
    try {
        const { user_id, year, month } = req.query;
        if (!user_id || !year || !month) {
            throw new ApiException('Missing required query parameters', 400);
        }
        const categories = ['breakfast', 'lunch', 'dinner', 'other'];
        const report = {};

        for (const category of categories) {
            report[category] = await Calorie.find({ user_id, year, month, category },
                 'day description amount');
        }

        res.send(report);
    } catch (err) {
        if (err instanceof ApiException) {
            res.status(err.code).send({ error: err.message });
        } else {
            res.status(500).send(err);
        }
    }
});

// Get developer information
router.get('/about', (req, res) => {
    console.log('About endpoint was hit'); 
    const developers = [
        { firstname: 'matan', lastname: 'itzhaki', id: 315529719,
             email: 'matanitzhaki3@gmail.com' },
        { firstname: 'ofek', lastname: 'ezra', id: 208494336,
             email: 'ofek040897@gmail.com' },
        { firstname: 'ido michael', lastname: 'barnea', id: 316315837,
             email: 'idorr1234@gmail.com' }
    ];
    res.json(developers);
});

module.exports = router;
