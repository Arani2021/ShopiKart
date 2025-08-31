
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Badge,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { ShoppingCart, AccountCircle, Search } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const categories = ["All", "Electronics", "Fashion", "Home", "Books", "Toys", "Sports"];

const Header = () => {
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#004d40", boxShadow: 3 }}>
      {/* 🔹 Top Toolbar */}
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Brand */}
        <Button
          component={Link}
          to="/"
          sx={{
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
            letterSpacing: 1,
            textTransform: "none",
          }}
        >
          ShopiKart
        </Button>

        {/* Search Bar */}
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            width: 300,
            mx: 3,
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 1,
            px: 1,
          }}
        >
          <InputBase
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1, pl: 1, fontSize: "0.9rem" }}
          />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: "#ffb300",
              "&:hover": { backgroundColor: "#ffa000" },
            }}
          >
            <Search />
          </IconButton>
        </Box>

        {/* Account + Cart */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              <Button
                color="inherit"
                startIcon={<AccountCircle />}
                sx={{ color: "white", textTransform: "none" }}
                onClick={handleMenuOpen}
              >
                {user.name || "Account"}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                  Profile
                </MenuItem>
                <MenuItem component={Link} to="/orders" onClick={handleMenuClose}>
                  My Orders
                </MenuItem>
                {user.isAdmin && (
                  <MenuItem component={Link} to="/admin" onClick={handleMenuClose}>
                    Admin Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              color="inherit"
              startIcon={<AccountCircle />}
              sx={{ color: "white", textTransform: "none" }}
            >
              Account
            </Button>
          )}

          <IconButton component={Link} to="/cart" sx={{ color: "white" }}>
            <Badge badgeContent={items.length} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      {/* 🔹 Categories Nav Row */}
      <Toolbar
        sx={{
          backgroundColor: "#00695c",
          minHeight: "45px",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {categories.slice(0, 3).map((cat) => (
          <Button
            key={cat}
            component={Link}
            to={cat === "All" ? "/" : `/?category=${cat}`}
            sx={{
              color: "white",
              flex: 1,
              textTransform: "none",
              fontWeight: 500,
              maxWidth: "120px",
            }}
          >
            {cat}
          </Button>
        ))}

        {/* Rental Button (special style) */}
        <Button
          key="Rental"
          component={Link}
          to="/rental"
          sx={{
            backgroundColor: "#ffb300",
            color: "black",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 1,
            px: 2,
            "&:hover": { backgroundColor: "#ffa000" },
          }}
        >
          Rentals
        </Button>

        {categories.slice(3).map((cat) => (
          <Button
            key={cat}
            component={Link}
            to={`/?category=${cat}`}
            sx={{
              color: "white",
              flex: 1,
              textTransform: "none",
              fontWeight: 500,
              maxWidth: "120px",
            }}
          >
            {cat}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
