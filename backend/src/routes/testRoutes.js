const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.post('/start', testController.startTest);
router.patch('/:id/answer', testController.saveAnswer);
router.post('/:id/submit', testController.submitTest);

module.exports = router;
