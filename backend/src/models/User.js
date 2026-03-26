const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
        },
        company: {
            type: String,
        },
        companyName: {
            type: String,
        },
        dateOfBirth: {
            type: Date,
        },
        profileImage: {
            type: String,
        },
        password: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
