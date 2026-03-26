const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema(
    {
        applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true, unique: true },
        questions: [
            {
                questionId: { type: String, required: true },
                questionText: { type: String, required: true },
                options: [String],
                correctAnswer: { type: String, required: true }
            }
        ],
        answers: {
            type: Map,
            of: String, // Question ID -> Selected option string
            default: {}
        },
        score: { type: Number, default: null },
        tabSwitchCount: { type: Number, default: 0 },
        isSubmitted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.models.Test || mongoose.model('Test', TestSchema);
