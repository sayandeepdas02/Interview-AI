const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    questionText: { type: String, required: true },
    optionA: { type: String, required: true },
    optionB: { type: String, required: true },
    optionC: { type: String, required: true },
    optionD: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    timeLimit: { type: Number, default: 30 },
    order: { type: Number, default: 0 },
});

const CustomFieldSchema = new Schema({
    fieldName: { type: String, required: true },
    fieldType: { type: String, required: true },
    required: { type: Boolean, default: false },
    options: { type: String },
});

const JobSchema = new Schema(
    {
        title: { type: String, required: true },
        description: String,
        roleType: String,
        experienceLevel: String,
        location: String,
        status: { type: String, default: 'draft' },
        shareableLink: { type: String, unique: true, sparse: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        testEnabled: { type: Boolean, default: false },
        testDuration: Number,
        passingScore: Number,
        questions: [QuestionSchema],
        customFields: [CustomFieldSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.models.Job || mongoose.model('Job', JobSchema);
