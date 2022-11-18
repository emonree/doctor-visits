const express = require('express');
const app = express();
const mongoose = require('mongoose')
const methodOverride = require('method-override');

let PORT = 3000;
if(process.env.PORT) {
    PORT = process.env.PORT
}

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

///// SCHEMA /////
const entryData = require('./models/entries');
const Entries = require('./models/entrySchema');

///// SEED ROUTE /////
app.get('/seed', (req, res) => {
    Entries.create(entryData, (err, entryList) => {
        res.send(entryList);
    })
})

///// NEW PATH (get) /////
app.get('/officevisit/new', (req, res) => {
    res.send('hi')
    // res.render(
    //     'new.ejs'
    // )
});

///// INDEX (get) /////
app.get('/officevisit', (req, res) => {
    res.send('hi')
})

///// CREATE (post) /////

///// SHOW (get) /////

///// EDIT (get) /////

///// UPDATE (patch/put) /////

///// DELETE /////

///// LISTENERS /////
app.listen(PORT, () => {
    console.log('listening...');
});

mongoose.connect('mongodb+srv://emonga:aBB4E9oTaQ48nM&Y@cluster0.0eubsxh.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo')
})