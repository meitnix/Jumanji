const express = require('express')
const router = express.Router()
const storesController = require('../controllers/storeController')
const verifyJWT = require('../middleware/verifyJWT')

//router.use(verifyJWT)

router.route('/')
    .get(storesController.getAllStores)
    .post(storesController.createNewStore)
    .patch(storesController.updateStore)
    .delete(storesController.deleteStore)

module.exports = router