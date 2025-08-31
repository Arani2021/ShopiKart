

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper, Typography, CircularProgress, Alert, Box } from "@mui/material";
import { fetchAdminStats } from "../../features/adminSlice";
import AdminLayout from "../../components/AdminLayout";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats = {}, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  const metrics = [
    { label: "Total Products", value: stats.totalProducts, color: "#42a5f5" },
    { label: "Total Users", value: stats.totalUsers, color: "#66bb6a" },
    { label: "Total Orders", value: stats.totalOrders, color: "#ff7043" },
  ];

  return (
    <AdminLayout>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Dashboard Overview
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {metrics.map((m) => (
            <Grid item xs={12} md={4} key={m.label}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  bgcolor: m.color,
                  color: "#fff",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6">{m.label}</Typography>
                <Typography variant="h4" fontWeight={700}>
                  {m.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
