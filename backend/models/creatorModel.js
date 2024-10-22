const mongoose = require('mongoose')

const creatorSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }, 
    bio: { 
        type: String 
    },
    projects: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project' 
    }], // List of project IDs
});

const Creator = mongoose.model('Creator', creatorSchema)

module.exports = Creator;