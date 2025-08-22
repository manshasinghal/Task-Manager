import React, { useState } from 'react';
import api from '../api';

const UserList = ({ users, onUserAction }) => {
  const [editRole, setEditRole] = useState({ userId: null, role: '' });

  const handleUpdateRole = async (userId) => {
    try {
      await api.put(`/users/${userId}`, { role: editRole.role });
      setEditRole({ userId: null, role: '' });
      onUserAction();
    } catch (err) {
      console.error('Failed to update user role', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      onUserAction();
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                {editRole.userId === user._id ? (
                  <select
                    value={editRole.role}
                    onChange={(e) => setEditRole({ ...editRole, role: e.target.value })}
                  >
                    <option value="user">user</option>
                    <option value="manager">manager</option>
                    <option value="admin">admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="py-2 px-4 border-b space-x-2">
                {editRole.userId === user._id ? (
                  <button onClick={() => handleUpdateRole(user._id)} className="bg-green-500 text-white px-3 py-1 rounded text-sm">Save</button>
                ) : (
                  <button onClick={() => setEditRole({ userId: user._id, role: user.role })} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit Role</button>
                )}
                <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;