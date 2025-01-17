const express = require('express');
const { createTask, getTasks,deleteTask,updateTaskStatus,exportTasksToPDF,sendTasksPDF } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-task', authMiddleware, createTask);
router.get('/get-tasks', getTasks);
router.delete('/:id', deleteTask);
router.put('/:id', updateTaskStatus);
router.post('/export-pdf', exportTasksToPDF);
router.post('/send-email', sendTasksPDF);

module.exports = router;
