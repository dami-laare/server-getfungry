const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Valid'
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }
})

module.exports = mongoose.model('Invite', inviteSchema);