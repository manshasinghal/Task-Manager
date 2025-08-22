import React, { useState, useEffect } from 'react';
import api from '../api';

const TaskList = ({ tasks, onTaskAction }) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [localTasks, setLocalTasks] = useState([]);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      setLocalTasks(localTasks.map(task => task._id === taskId ? { ...task, status: newStatus } : task));
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleEditClick = (task) => {
    setEditTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
  };

  const handleEditSubmit = async (e) => {
  e.preventDefault();
  if (!editTaskId) return;

  try {
    await api.put(`/tasks/${editTaskId}`, {
      title: editTitle,
      description: editDescription,
      status: editStatus,
    });

    // update task locally
    setLocalTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === editTaskId
          ? { ...task, title: editTitle, description: editDescription, status: editStatus }
          : task
      )
    );

    // reset edit form
    setEditTaskId(null);
    setEditTitle('');
    setEditDescription('');
    setEditStatus('');

    // optional: refresh tasks from parent
    onTaskAction();
  } catch (err) {
    console.error('Failed to edit task', err);
  }
};


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {localTasks.length === 0 ? (
        <p className="text-gray-400">No tasks found.</p>
      ) : (
        localTasks.map(task => (
          <div key={task._id} className="bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-md border border-white/10 text-white">
            {editTaskId === task._id ? (
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/60 border border-fuchsia-400/40 focus:ring-2 focus:ring-fuchsia-500/40 outline-none text-indigo-50 text-sm"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/60 border border-fuchsia-400/40 focus:ring-2 focus:ring-fuchsia-500/40 outline-none text-indigo-50 text-sm"
                />
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="p-1 border rounded text-sm bg-gray-700 text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In-Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="flex gap-2 text-xs">
                  <button type="submit" className="px-3 py-2 rounded-md bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition">Save</button>
                  <button type="button" onClick={() => setEditTaskId(null)} className="px-3 py-2 rounded-md bg-slate-600 text-white font-semibold hover:bg-slate-500 transition">Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <h4 className="text-xl font-semibold mb-2">{task.title}</h4>
                <p className="text-gray-300 mb-2">{task.description}</p>
                <p className="text-sm text-gray-400">
                  Assigned to: {task.assignedTo ? task.assignedTo.name : 'N/A'}
                </p>
                <p className="text-sm text-gray-400">
                  Due Date: {new Date(task.dueDate).toLocaleDateString()}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    task.status === 'completed' ? 'bg-green-200 text-green-800' :
                    task.status === 'in-progress' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {task.status}
                  </span>
                  <select
                    className="ml-2 p-1 border rounded text-sm bg-gray-700 text-white"
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    onClick={() => handleEditClick(task)}
                    className="ml-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
