const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const walletSchema = new mongoose.Schema(
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
        address: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

walletSchema.plugin(AutoIncrement, {
    inc_field: 'anum',
    id: 'addressNums',
    start_seq: 500
})

module.exports = mongoose.model('Wallet', walletSchema)