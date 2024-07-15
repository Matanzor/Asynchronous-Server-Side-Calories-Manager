//matan itzhaki, 315529719
//ofek ezra, 20849336
//ido michael barnea, 316315837

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);
