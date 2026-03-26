const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Route imports
const applicationRoutes = require('./src/routes/applicationRoutes');
const testRoutes = require('./src/routes/testRoutes');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ success: true, message: 'Interview AI Backend Service API' });
});

// API Routes
app.use('/api/applications', applicationRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, data: null, error: 'Server Error' });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
