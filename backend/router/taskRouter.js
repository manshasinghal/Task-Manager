const express = require('express');
const { addTask, getTasksByUserId, updateTask, deleteTask, reorderTasks } = require('../controller/TaskController');
const router = express.Router();

router.post('/tasks/:userId', addTask);
router.get('/tasks/:userId', getTasksByUserId);
router.put('/tasks/:id', updateTask);
router.patch('/tasks/:id', updateTask); // allow partial updates
router.delete('/tasks/:id', deleteTask);
router.post('/tasks/:userId/reorder', reorderTasks);

module.exports = router;