const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Interview AI Backend Service is running');
});

// Placeholder for future microservices (e.g. Resume Parsing, heavy computation)

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
