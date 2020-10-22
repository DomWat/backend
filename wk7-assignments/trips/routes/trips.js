const express = require('express')
const router = express.Router()
const {v4:uuidv4} = require('uuid')

router.get('/', (req, res) => {
    res.render('trips', {trips: tripsList})
})

router.post('/create-trip', (req, res) => {
    const name = req.body.name
    const departDate = req.body.departDate
    const returnDate = req.body.returnDate

    let trip = {
        tripId: uuidv4(),
        name: name,
        departDate: departDate,
        returnDate: returnDate
    }

    tripsList.push(trip)

    res.redirect('/trips')

})

router.post('/delete-trip', (req, res) => {
    const tripId = req.body.tripId

    tripsList = tripsList.filter((trip) => {
        return trip.tripId != tripId
    })

    res.redirect('/trips')
})

module.exports = router