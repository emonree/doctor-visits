const express = require('express');
const router = express.Router();
const Patients = require('../models/patientSchema');
const patientData = require('../models/patients');

///// SEED ROUTE /////
router.get('/seed', (req, res) => {
    Patients.create(patientData, (err, patientList) => {
        if (err) {
            console.log('err',err)
        }
        res.send(patientList);
    })
})

///// NEW PATH (get) /////
router.get('/new', (req, res) => {
    res.render(
        'new.ejs'
    )
});

///// CREATE (post) /////
router.post('/', (req, res) => {
    console.log(req)
    console.log('////')
    Patients.create(req.body, (err, patient) => {
        if (err) {
            console.log('err',err)
        } else {
            console.log(patient)
        }
        res.redirect('/patients/' + patient._id + '/visits/new')
    })
});

///// NEW VISITS (get) /////
router.get('/:id/visits/new', (req, res) => {
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

///// EDIT EXISTING VISIT
router.get('/:id/visits/:visit_idx/edit', (req, res) => {
    Patients.findById(req.params.id, (err, foundPatient) => {
        if (err) {
            console.log('err',err)
        }
        // console.log('foundPatient',foundPatient)
        console.log('req.params',req.params)
        const foundVisit = foundPatient.visits[req.params.visit_idx];
        res.render(
            'visitedit.ejs',
            {
                patient: foundPatient,
                visit: foundVisit,
                visitIdx: req.params.visit_idx
            }
        )
    })
})

///// INDEX (get) /////
router.get('/', (req, res) => {
    console.log('index')
    Patients.find({}, (err, patientList) => {
        if (err) {
            console.log('err',err)
        }
        res.render(
            'index.ejs',
            {
                patients: patientList
            }
        )
    })
})

///// SHOW (get) /////
router.get('/:id', (req, res ) => {
    Patients.findById(req.params.id, (err, foundPatient) => {
        if (err) {
            console.log('err',err)
        }
        console.log('foundPatient SHOW',foundPatient)
        res.render(
            'show.ejs',
            {
                patient: foundPatient
            }
        )
    })
})

///// DELETE /////
router.delete('/:id', (req, res) => {
    Patients.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/patients');
    });
})

///// EDIT (get) /////
router.get('/:id/edit', (req, res) => {
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

///// UPDATE (patch/put) /////
router.put('/:id', (req, res) => {
    if (req.body.visitIdx) {
        // if request params includes an index for the visits array, assume it is for editing an existing visit entry
        Patients.findOneAndUpdate({
            _id: req.params.id,
        }, {$set: {
            // must use dot notation to target the specific index in the visits array
            // documentation https://www.mongodb.com/docs/manual/reference/operator/update/positional/#update-values-in-an-array
            [`visits.${req.body.visitIdx}`]: {
                dateOfService: req.body.dateOfService,
                rxList: req.body.rxList,
                drsOrders: req.body.drsOrders,
            },
        }}, {new:true}, (err, updatedModel) => {
            if (err) {
                console.log('err',err)
            }
            res.redirect(`/patients/${req.params.id}`)
        })
    } else if (req.body.dateOfService && req.body.rxList && req.body.drsOrders) {
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

module.exports = router;