const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Calorie = require('../models/Calorie');

// Add a new calorie consumption item
router.post('/addcalories/', async (req, res) => {
    try {
        const { user_id, year, month, day, description, category, amount } = req.body;
        const calorie = new Calorie({ user_id, year, month, day, description, category, amount });
        await calorie.save();
        res.status(201).send(calorie);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;

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
router.get('/report/', async (req, res) => {
    try {
        const { user_id, year, month } = req.query;
        const categories = ['breakfast', 'lunch', 'dinner', 'other'];
        const report = {};

        for (let category of categories) {
            report[category] = await Calorie.find({ user_id, year, month, category }, 'day description amount');
        }

        res.send(report);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get developer details
router.get('/about/', (req, res) => {
    const developers = [
        { firstname: 'matan', lastname: 'itzhaki', id: 315529719, email: 'matanitzhaki3@gmail.com' },
        { firstname: 'xxx', lastname: 'xxx', id: 123, email: 'xxx@gmail.com' }
    ];
    res.send(developers);
});

module.exports = router;
