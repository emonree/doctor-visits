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
const patientData = require('./models/patients');
const Patients = require('./models/patientSchema');

///// SEED ROUTE /////
app.get('/seed', (req, res) => {
    Patients.create(patientData, (err, patientList) => {
        if (err) {
            console.log('err',err)
        }
        res.send(patientList);
    })
})

///// NEW PATH (get) /////
app.get('/patients/new', (req, res) => {
    res.send('hi')
    // res.render(
    //     'new.ejs'
    // )
});

///// INDEX (get) /////
app.get('/patients', (req, res) => {
    Patients.find({}, (err, patientList) => {
        if (err) {
            console.log('err',err)
        }
        console.log('patient data', patientList)
        res.render(
            'index.ejs',
            {
                patients: patientList
            }
        )
    })
    // res.send('hi')
})

///// CREATE (post) /////

///// SHOW (get) /////
app.get('/patients/:id', (req, res ) => {
    Patients.findById(req.params.id, (err, foundPatient) => {
        res.render(
            'show.ejs',
            {
                patient: foundPatient
            }
        )
    })
})

///// LANDING PAGE /////
app.get('/', (req, res) => {
    res.render('landing.ejs')
})

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

// mongoose.connect('mongodb://localhost:27017/patients', () => {
//     console.log('The connection with mongod is established')
//   })