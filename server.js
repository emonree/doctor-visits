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
    console.log('new pt')
    // res.send('hi')
    res.render(
        'new.ejs'
    )
});

///// INDEX (get) /////
app.get('/patients', (req, res) => {
    console.log('index')
    Patients.find({}, (err, patientList) => {
        if (err) {
            console.log('err',err)
        }
        // console.log('patient data', patientList)
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
app.post('/patients', (req, res) => {
    console.log('create pt')
    Patients.create(req.body, (err, patient) => {
        if (err) {
            console.log('err',err)
        } else {
            console.log(patient)
        }
        res.redirect('/patients/' + patient._id + '/visits/new')
    })
});

///// SHOW (get) /////
app.get('/patients/:id', (req, res ) => {
    console.log('showpt')
    Patients.findById(req.params.id, (err, foundPatient) => {
        if (err) {
            console.log('err',err)
        }
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
app.get('/patients/:id/edit', (req, res) => {
    console.log('edit')
    Patients.findById(req.params.id, (err, foundPatient) => {
        res.render(
            'edit.ejs',
            {
                patient: foundPatient
            } 
        )
    })
})

///// CREATE NEW VISIT (post) /////
// app.put('patients/:id/visits/', (req, res) => {
//     console.log('reqQQQ',req.params)
//     // find patient by ID and add one visit to the visits array
//     Patients.findByIdAndUpdate(req.params.id, {$push: {visits: req.body}}, (err, patient) => {
//         if (err) {
//             console.log('err',err)
//         } else {
//             console.log(patient)
//         }
//         // res.redirect('/patients/' + patient._id + '/visits/')
//         res.redirect('/patients/'+req.params.id)
//     })
// });

///// NEW VISITS (get) /////
app.get('/patients/:id/visits/new', (req, res) => {
    console.log('new visit')
    Patients.findById(req.params.id, (err, foundPatient) => {
        res.render(
            'visitnew.ejs',
            {
                patient: foundPatient
            } 
        )
    })
    // res.render('visitnew.ejs');
})


///// UPDATE (patch/put) /////
app.put('/patients/:id', (req, res) => {
    console.log('put req',req)
    if (req.params.visit_id) {
        // if request params includes /visits/:visit_id, assume it is for editing an existing visit entry
        console.log('req.params.visit_id'.req.params.visit_id);
        res.redirect(`patients/${req.params.id}`)
    } else if (req.body.dateOfService && req.body.rxList && req.body.drsOrders) {
        console.log('req.params')
        // if request body has the keys for a visit, assume that it is for a new visits entry
        Patients.findByIdAndUpdate(req.params.id, {$push: {visits: req.body}}, (err, updatedModel) => {
            res.redirect(`/patients/${req.params.id}`)
        })
    } else {
        // edit patient's main details
        Patients.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
            res.redirect(`/patients/${req.params.id}`)
        })
    }
})

///// DELETE /////
app.delete('/patients/:id', (req, res) => {
    Patients.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/patients');
    });
})

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