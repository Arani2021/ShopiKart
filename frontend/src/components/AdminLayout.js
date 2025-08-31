// src/components/AdminLayout.js
import React from "react";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { Dashboard, Inventory, People, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
  { text: "Products", icon: <Inventory />, path: "/admin/products" },
  { text: "Users", icon: <People />, path: "/admin/users" },
  { text: "Orders", icon: <ShoppingCart />, path: "/admin/orders" },
];

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
<Drawer
  variant="permanent"
  sx={{
    width: drawerWidth,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      backgroundColor: "#1b263b",
      color: "#fff",
      top: "125px",   // ⬅️ 5ush it below Header
      height: "calc(100% - 64px)", 
    },
  }}
>

        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                "&:hover": { backgroundColor: "#415a77" },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Page Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
