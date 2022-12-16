const express = require('express')
const router = express.Router()
const tripsController = require('../controllers/tripsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(tripsController.getAllTrips)
    .post(tripsController.createNewTrip)
    .patch(tripsController.updateTrip)
    .delete(tripsController.deleteTrip)

module.exports = router