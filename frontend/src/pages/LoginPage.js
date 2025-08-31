

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import { login, register, clearError } from "../features/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login({ email: formData.email, password: formData.password }));
    } else {
      dispatch(register({ name: formData.name, email: formData.email, password: formData.password }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    dispatch(clearError());
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mt: 6,
          borderRadius: 3,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          align="center"
          gutterBottom
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          {isLogin ? "Sign In to ShopiKart" : "Create Your Account"}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2, borderRadius: 2, "&:hover": { backgroundColor: "#2fa383" } }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : isLogin ? "Sign In" : "Sign Up"}
          </Button>
          <Box textAlign="center">
            <Link component="button" variant="body2" onClick={toggleMode} disabled={loading}>
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
