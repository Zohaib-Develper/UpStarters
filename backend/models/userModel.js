const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true,"Please enter password"],
        minlength : [8,'Password length must be graetor than 8'],
        // select : false
    },
    confirmPassword: {
        type: String,
        required: true,
        // select : false
    },
    email: { 
        type: String, 
        required: [true,'Please enter email address.'], 
        unique: [true, 'Email must be unique.']
    },
    role: { 
        type: String, 
        enum: ['creator', 'investor'], 
        required: [true, 'Please enter your role.'],
    },
    PasswordChangedAt: Date,
})

userScheme.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;

    if (!this.isNew) this.PasswordChangedAt = Date.now() - 1000;
    next();
});

userScheme.methods.CorrectPassword = async function(CandiatePassword, UserPassword){
    return await bcrypt.compare(CandiatePassword, UserPassword);
}


userScheme.methods.PasswordChangedAfter = function(JWTTimestamp) {
    if (this.PasswordChangedAt) {
        
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        // Compare password change timestamp with JWT issue timestamp (iat)
        return JWTTimestamp < changedTimestamp; // Returns true if password was changed after token was issued
    }

    // False means the password was not changed after the JWT was issued
    return false;
};

const User = mongoose.model('User', userScheme);

module.exports = User;