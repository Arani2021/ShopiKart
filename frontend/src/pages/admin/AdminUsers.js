

import AdminLayout from "../../components/AdminLayout";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Delete, AdminPanelSettings } from '@mui/icons-material';
import api from '../../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/users');
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleToggleAdmin = async (id, isAdmin) => {
    try {
      const { data } = await api.put(`/admin/users/${id}`, { isAdmin });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isAdmin: data.isAdmin } : u))
      );
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

return (
  <AdminLayout>
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Users Management
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Joined Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.isAdmin ? 'Admin' : 'User'}
                      color={user.isAdmin ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleToggleAdmin(user._id, !user.isAdmin)}
                      color={user.isAdmin ? 'primary' : 'default'}
                    >
                      <AdminPanelSettings />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(user._id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  </AdminLayout>
);
};

export default AdminUsers;
