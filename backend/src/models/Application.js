const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
    {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
        candidateDetails: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            resumeUrl: { type: String },
            customFields: { type: Map, of: mongoose.Schema.Types.Mixed }
        },
        status: {
            type: String,
            enum: ['APPLIED', 'TESTING', 'SHORTLISTED', 'REJECTED', 'INTERVIEWED'],
            default: 'APPLIED'
        }
    },
    { timestamps: true }
);

ApplicationSchema.index({ jobId: 1, status: 1 });

module.exports = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
