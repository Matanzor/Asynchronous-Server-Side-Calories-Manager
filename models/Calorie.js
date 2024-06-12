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
});

module.exports = mongoose.model('Calorie', calorieSchema);
