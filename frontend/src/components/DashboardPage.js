import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../components/AuthContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import UserList from '../components/UserList';

const DashboardPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetchTasks();
    if (user.role === 'admin' || user.role === 'manager') {
      fetchUsers();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const handleTaskAction = () => {
    fetchTasks();
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
  };
  
  const handleUserAction = () => {
    fetchUsers();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-900 via-indigo-800 to-slate-900 relative overflow-hidden flex flex-col items-center font-poppins px-4 sm:px-6 lg:px-8 py-10">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Dashboard</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {(user.role === 'admin' || user.role === 'manager') && (
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 shadow-xl shadow-black/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,theme(colors.indigo.400),transparent_60%),radial-gradient(circle_at_bottom_right,theme(colors.fuchsia.500),transparent_60%)]" />
            <h3 className="text-2xl font-semibold mb-4 text-white">
              {taskToEdit ? 'Edit Task' : 'Create New Task'}
            </h3>
            <TaskForm 
              users={users} 
              onTaskAction={handleTaskAction}
              taskToEdit={taskToEdit}
              setTaskToEdit={setTaskToEdit}
            />
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-indigo-100/90 flex items-center gap-2">Your Tasks</h3>
          <TaskList tasks={tasks} onTaskAction={handleTaskAction} onEdit={handleEditTask} />
        </div>

        {user.role === 'admin' && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-indigo-100/90 flex items-center gap-2">User Management</h3>
            <UserList users={users} onUserAction={handleUserAction} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;