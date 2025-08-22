import React, { useState } from 'react';
import api from '../api';

const TaskForm = ({ onTaskAction, users }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { title, description, assignedTo, dueDate });
      setTitle('');
      setDescription('');
      setAssignedTo('');
      setDueDate('');
      onTaskAction();
    } catch (err) {
      console.error(err);
    }
  };

  return (
   <form 
  onSubmit={handleSubmit} 
  className="relative flex flex-col items-center gap-4 text-white"
>
  <div className="flex flex-col gap-4 w-full max-w-md">
    {/* Title */}
    <div>
      <label className="block text-white mb-1">Title</label>
      <input
        type="text"
        className="w-full px-4 py-3 rounded-xl bg-slate-900/40 border border-white/10 focus:border-fuchsia-400/60 focus:ring-2 focus:ring-fuchsia-500/40 outline-none text-indigo-50 placeholder:text-indigo-300/40 text-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </div>

    {/* Assigned To */}
    <div>
      <label className="block text-white mb-1">Assigned To</label>
      <select
        className="w-full px-4 py-3 rounded-xl bg-slate-900/40 border border-white/10 text-indigo-100 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        required
      >
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>
            {user.name} ({user.role})
          </option>
        ))}
      </select>
    </div>

    {/* Due Date */}
    <div>
      <label className="block text-white mb-1">Due Date</label>
      <input
        type="date"
        className="w-full px-4 py-3 rounded-xl bg-slate-900/40 border border-white/10 focus:border-fuchsia-400/60 focus:ring-2 focus:ring-fuchsia-500/40 outline-none text-indigo-50 text-sm"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
    </div>

    {/* Description */}
    <div>
      <label className="block text-white mb-1">Description</label>
      <textarea
        className="w-full px-4 py-3 rounded-xl bg-slate-900/40 border border-white/10 focus:border-fuchsia-400/60 focus:ring-2 focus:ring-fuchsia-500/40 outline-none text-indigo-50 placeholder:text-indigo-300/40 text-sm"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />
    </div>

    {/* Submit Button */}
    <button 
      type="submit"
      className="w-full px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-fuchsia-500 via-pink-500 to-indigo-500 text-white shadow hover:shadow-fuchsia-500/30 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      Create Task
    </button>
  </div>
</form>

  );
};

export default TaskForm;