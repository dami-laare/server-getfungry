const mongoose = require('mongoose');

const mealTicketSchema = new mongoose.Schema({
    expires: Date,
    value: String,
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'Valid'
    }
})

module.exports = mongoose.model('Meal Ticket', mealTicketSchema);