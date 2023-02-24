const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const storeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

storeSchema.plugin(AutoIncrement, {
    inc_field: 'trip',
    id: 'tripno',
    start_seq: 100
})

module.exports = mongoose.model('Store', storeSchema)