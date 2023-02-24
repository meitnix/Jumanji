const Store = require('../models/Store')
const User = require('../models/User')

// @desc Get all stores 
// @route GET /stores
// @access Private
const getAllStores = async (req, res) => {
    // Get all stores from MongoDB
    const stores = await Store.find().lean()

    // If no stores 
    if (!stores?.length) {
        return res.status(400).json({ message: 'No stores found' })
    }

    // Add username to each store before sending the response 
    // Alternate for...of loop
    const storesWithUser = await Promise.all(stores.map(async (store) => {
        const user = await User.findById(store.user).lean().exec()
        return { ...store, username: user.username }
    }))

    res.json(storesWithUser)
}

// @desc Create new store
// @route POST /stores
// @access Private
const createNewStore = async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Store.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate store title' })
    }

    // Create and store the new user 
    const store = await Store.create({ user, title, text })

    if (store) { // Created 
        return res.status(201).json({ message: 'New store created' })
    } else {
        return res.status(400).json({ message: 'Invalid store data received' })
    }

}

// @desc Update a store
// @route PATCH /stores
// @access Private
const updateStore = async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm store exists to update
    const store = await Store.findById(id).exec()

    if (!store) {
        return res.status(400).json({ message: 'Store not found' })
    }

    // checking duplicate title
    const duplicate = await Store.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original store 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate store title' })
    }

    store.user = user
    store.title = title
    store.text = text
    store.completed = completed

    const updatedStore = await store.save()

    res.json(`'${updatedStore.title}' updated`)
}

// @desc Delete a store
// @route DELETE /stores
// @access Private
const deleteStore = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Store ID required' })
    }

    // Confirm store exists to delete 
    const store = await Store.findById(id).exec()

    if (!store) {
        return res.status(400).json({ message: 'Store not found' })
    }

    const result = await store.deleteOne()

    const reply = `Store '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllStores,
    createNewStore,
    updateStore,
    deleteStore
}