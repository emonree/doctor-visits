const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    name: String,
    species: String,
    img: String,
    breed: String,
    age: String,
    sex: String,
})

const entryCollection = mongoose.model('Entries', entrySchema);
module.exports = entryCollection;
