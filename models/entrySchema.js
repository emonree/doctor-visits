const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthday: { type: String, required: true },
    gender: { type: String, required: false },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    drugAllergies: { type: String, required: true },
    medicalConditions: { type: String, required: true },
    rxList: { type: String, required: true },
})

const entryCollection = mongoose.model('Entries', entrySchema);
module.exports = entryCollection;
