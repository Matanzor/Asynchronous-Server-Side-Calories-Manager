//matan itzhaki, 315529719
//ofek ezra, 20849336
//ido michael barnea, 316315837

const mongoose = require('mongoose');

const calorieSchema = new mongoose.Schema({
    user_id: { type: Number, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ['breakfast', 'lunch', 'dinner', 'other'] },
    amount: { type: Number, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Calorie', calorieSchema);

