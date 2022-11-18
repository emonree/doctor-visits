const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthday: { type: String, required: true },
    gender: { type: String, required: false },
    height: { type: String, required: false },
    weight: { type: String, required: false },
    drugalleries: { type: String, required: true },
    medicalconditions: { type: String, required: true },
    rxlist: { type: String, required: true },
    rxchanges: { type: String, required: false },
    drorders: { type: String, required: true },
    
})

const entryCollection = mongoose.model('Entries', entrySchema);
module.exports = entryCollection;
