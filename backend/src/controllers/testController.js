const testService = require('../services/testService');
const { sendSuccess, sendError } = require('../utils/response');

const startTest = async (req, res) => {
    try {
        const { applicationId } = req.body;
        if (!applicationId) return sendError(res, 'applicationId is required', 400);

        const test = await testService.startTest(applicationId);
        return sendSuccess(res, test, 201);
    } catch (error) {
        return sendError(res, error.message, 400);
    }
};

const saveAnswer = async (req, res) => {
    try {
        const { id } = req.params; // testId
        const { questionId, selectedOption, tabSwitched } = req.body;
        
        const test = await testService.saveAnswer(id, questionId, selectedOption, tabSwitched);
        return sendSuccess(res, { message: 'Answer saved successfully' });
    } catch (error) {
        return sendError(res, error.message, 400);
    }
};

const submitTest = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await testService.submitTest(id);
        return sendSuccess(res, { score: test.score, isSubmitted: test.isSubmitted });
    } catch (error) {
        return sendError(res, error.message, 400);
    }
};

module.exports = { startTest, saveAnswer, submitTest };
