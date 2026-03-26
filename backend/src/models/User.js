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
        password: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
