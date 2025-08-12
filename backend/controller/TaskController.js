const { Task } = require('../db');

// Controller to add a new task
async function addTask(req, res) {
  const { task, status } = req.body;
  const { userId } = req.params;
  try {
    // Determine next order value for this user's tasks
    const lastTask = await Task.findOne({ userId }).sort({ order: -1 }).select('order');
    const nextOrder = lastTask ? lastTask.order + 1 : 0;
    const newTask = new Task({ userId, task, status: status || 'todo', order: nextOrder });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Error adding task', error: err.message });
  }
}

// Controller to get all tasks for a user (sorted by order then created)
async function getTasksByUserId(req, res) {
  try {
    const tasks = await Task.find({ userId: req.params.userId }).sort({ order: 1, createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
}

// Controller to edit an existing task (partial updates)
async function updateTask(req, res) {
  try {
    const updates = {};
    if (typeof req.body.task === 'string') updates.task = req.body.task;
    if (typeof req.body.status === 'string') updates.status = req.body.status;
    if (typeof req.body.order === 'number') updates.order = req.body.order;
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }
    updates.modifiedAt = Date.now();
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error editing task', error: err.message });
  }
}

async function deleteTask(req, res) {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
}

// Bulk reorder tasks for a user. Body: { tasks: [taskId1, taskId2, ...] }
async function reorderTasks(req, res) {
  const { userId } = req.params;
  const { tasks } = req.body;
  if (!Array.isArray(tasks)) {
    return res.status(400).json({ message: 'tasks must be an array of task IDs' });
  }
  try {
    // Ensure all tasks belong to user (optional minimal check)
    const existingIds = await Task.find({ _id: { $in: tasks }, userId }).select('_id');
    const existingSet = new Set(existingIds.map(t => t._id.toString()));
    const bulk = [];
    tasks.forEach((id, index) => {
      if (existingSet.has(id)) {
        bulk.push({ updateOne: { filter: { _id: id }, update: { order: index, modifiedAt: Date.now() } } });
      }
    });
    if (bulk.length) {
      await Task.bulkWrite(bulk);
    }
    const updated = await Task.find({ userId }).sort({ order: 1 });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error reordering tasks', error: err.message });
  }
}

module.exports = {
  addTask,
  getTasksByUserId,
  updateTask,
  deleteTask,
  reorderTasks
};