const Trip = require('../models/Trip')
const User = require('../models/User')

// @desc Get all trips 
// @route GET /trips
// @access Private
const getAllTrips = async (req, res) => {
    // Get all trips from MongoDB
    const trips = await Trip.find().lean()

    // If no trips 
    if (!trips?.length) {
        return res.status(400).json({ message: 'No trips found' })
    }

    // Add username to each trip before sending the response 
    // Alternate for...of loop
    const tripsWithUser = await Promise.all(trips.map(async (trip) => {
        const user = await User.findById(trip.user).lean().exec()
        return { ...trip, username: user.username }
    }))

    res.json(tripsWithUser)
}

// @desc Create new trip
// @route POST /trips
// @access Private
const createNewTrip = async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Trip.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate trip title' })
    }

    // Create and store the new user 
    const trip = await Trip.create({ user, title, text })

    if (trip) { // Created 
        return res.status(201).json({ message: 'New trip created' })
    } else {
        return res.status(400).json({ message: 'Invalid trip data received' })
    }

}

// @desc Update a trip
// @route PATCH /trips
// @access Private
const updateTrip = async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm trip exists to update
    const trip = await Trip.findById(id).exec()

    if (!trip) {
        return res.status(400).json({ message: 'Trip not found' })
    }

    // checking duplicate title
    const duplicate = await Trip.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original trip 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate trip title' })
    }

    trip.user = user
    trip.title = title
    trip.text = text
    trip.completed = completed

    const updatedTrip = await trip.save()

    res.json(`'${updatedTrip.title}' updated`)
}

// @desc Delete a trip
// @route DELETE /trips
// @access Private
const deleteTrip = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Trip ID required' })
    }

    // Confirm trip exists to delete 
    const trip = await Trip.findById(id).exec()

    if (!trip) {
        return res.status(400).json({ message: 'Trip not found' })
    }

    const result = await trip.deleteOne()

    const reply = `Trip '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllTrips,
    createNewTrip,
    updateTrip,
    deleteTrip
}