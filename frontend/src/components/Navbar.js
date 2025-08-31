import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Badge, 
  Box,
  Container,
} from '@mui/material';
import { ShoppingCart, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'background.paper', boxShadow: 2 }}>
      <Container>
        <Toolbar disableGutters>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              cursor: 'pointer',
              fontWeight: 'bold',
              color: 'primary.main',
              '&:hover': {
                color: 'primary.dark',
              },
              transition: 'color 0.2s',
            }}
            onClick={() => navigate('/')}
          >
            ShopiKart
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {user?.isAdmin && (
              <Button 
                variant="outlined"
                color="primary"
                onClick={() => navigate('/admin')}
                sx={{ mr: 1 }}
              >
                Admin Panel
              </Button>
            )}
            {isAuthenticated ? (
              <>
                <Button 
                  variant="text"
                  color="primary" 
                  startIcon={<Person />}
                  onClick={() => navigate('/profile')}
                  sx={{ 
                    '&:hover': { backgroundColor: 'primary.light' },
                  }}
                >
                  {user.name}
                </Button>
                <Button 
                  variant="text"
                  color="error"
                  onClick={handleLogout}
                  sx={{ 
                    '&:hover': { backgroundColor: 'error.light' },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="contained"
                color="primary"
                startIcon={<Person />}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            )}
            <Button 
              variant="contained"
              color="secondary"
              startIcon={
                <Badge badgeContent={0} color="error">
                  <ShoppingCart />
                </Badge>
              }
              onClick={() => navigate('/cart')}
              sx={{ ml: 1 }}
            >
              Cart
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
