const mongoose = require('mongoose')

const investorSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    investments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Investment' 
    }],
});

const Investor = mongoose.model('Investor', investorSchema)

module.exports = Investor