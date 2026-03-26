const applicationService = require('../services/applicationService');
const { sendSuccess, sendError } = require('../utils/response');

const createApplication = async (req, res) => {
    try {
        const { jobId, candidateData } = req.body;
        if (!jobId || !candidateData) {
            return sendError(res, 'Missing required fields', 400);
        }

        const application = await applicationService.applyToJob(jobId, candidateData);
        return sendSuccess(res, application, 201);
    } catch (error) {
        return sendError(res, error.message, error.message === 'Job not found' ? 404 : 500);
    }
};

const getApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await applicationService.getApplicationDetails(id);
        return sendSuccess(res, application);
    } catch (error) {
        return sendError(res, error.message, error.message === 'Application not found' ? 404 : 500);
    }
};

module.exports = {
    createApplication,
    getApplication
};
