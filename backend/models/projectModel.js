const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    summary: { 
        type: String,
        maxlength : [40,'Summary length must be less than 40'],  
    },
    description: { 
        type: String ,
        minlength : [50,'Descripton length must be graetor than 50'],
    },
    investmentGoal: { 
        type: Number, 
        required: true 
    },
    equityOffered: { 
        type: Number, 
        required: true 
    },
    fundsRaised: { 
        type: Number, 
        default: 0 
    },
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected', 'active'], 
        // required: true 
        default : 'pending'
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: '3d'  
    },
    startsFrom : {
        type : Date,
        required : true
    },
    creator: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Creator', 
        required: true 
    },
    investors: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Investor' 
    }], // List of investors who invested
});


const Project = mongoose.model('Project', projectSchema)

module.exports = Project