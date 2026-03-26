const Test = require('../models/Test');
const Application = require('../models/Application');
const Job = require('../models/Job');

const startTest = async (applicationId) => {
    const application = await Application.findById(applicationId);
    if (!application) throw new Error('Application not found');
    
    // Check if test already exists
    let test = await Test.findOne({ applicationId });
    if (test) {
        if (test.isSubmitted) throw new Error('Test already submitted');
        return test;
    }
    
    const job = await Job.findById(application.jobId);
    if (!job) throw new Error('Job not found');
    
    const questions = job.questions.map(q => ({
        questionId: q._id ? q._id.toString() : q.questionText,
        questionText: q.questionText,
        options: [q.optionA, q.optionB, q.optionC, q.optionD],
        correctAnswer: q.correctAnswer
    }));

    test = new Test({
        applicationId,
        questions,
        answers: {}
    });

    await test.save();
    
    application.status = 'TESTING';
    await application.save();

    // Strip out correctAnswer from returned test for security
    const sanitizedTest = test.toObject();
    sanitizedTest.questions.forEach(q => delete q.correctAnswer);
    return sanitizedTest;
};

const saveAnswer = async (testId, questionId, selectedOption, tabSwitched = false) => {
    const test = await Test.findById(testId);
    if (!test) throw new Error('Test not found');
    if (test.isSubmitted) throw new Error('Test already submitted');

    if (selectedOption !== undefined) {
        test.answers.set(questionId, selectedOption);
    }
    
    if (tabSwitched) {
        test.tabSwitchCount += 1;
    }

    await test.save();
    return test;
};

const submitTest = async (testId) => {
    const test = await Test.findById(testId);
    if (!test) throw new Error('Test not found');
    if (test.isSubmitted) throw new Error('Test already submitted');

    let score = 0;
    test.questions.forEach(q => {
        const selected = test.answers.get(q.questionId);
        if (selected && selected === q.correctAnswer) {
            score += 1;
        }
    });

    test.score = score;
    test.isSubmitted = true;
    await test.save();

    const application = await Application.findById(test.applicationId);
    if (application) {
        // Evaluate score against job passing requirement (assuming 50% for now or job.passingScore)
        application.status = 'INTERVIEWED';
        await application.save();
    }

    return test;
};

module.exports = { startTest, saveAnswer, submitTest };
