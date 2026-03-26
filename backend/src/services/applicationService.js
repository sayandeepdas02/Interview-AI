const Application = require('../models/Application');
const Job = require('../models/Job');

const applyToJob = async (jobId, candidateData) => {
    const job = await Job.findById(jobId);
    if (!job) {
        throw new Error('Job not found');
    }

    const newApplication = new Application({
        jobId,
        candidateDetails: candidateData,
        status: 'APPLIED' // default
    });

    await newApplication.save();
    return newApplication;
};

const getApplicationDetails = async (applicationId) => {
    const application = await Application.findById(applicationId).populate('jobId');
    if (!application) {
        throw new Error('Application not found');
    }
    return application;
};

module.exports = {
    applyToJob,
    getApplicationDetails
};
