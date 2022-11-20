const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthday: { type: String, required: true },
    gender: { type: String, required: false },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    drugAllergies: { type: String, required: true },
    medicalConditions: { type: String, required: true },
    visits: [{
        dateOfService: { type: String, required: true },
        rxList: { type: String, required: true },
        drsOrders: { type: String, required: true },
    }]
})

const entryCollection = mongoose.model('Entries', patientSchema);
module.exports = entryCollection;
