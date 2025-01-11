const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-task', authMiddleware, createTask);
router.get('/get-tasks', getTasks);

module.exports = router;
