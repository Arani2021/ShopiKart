

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeFromCart, updateQuantity, clearCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: "80vh" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Shopping Cart
      </Typography>

      {items.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              {items.map((item) => (
                <Box key={item._id}>
                  <Grid container spacing={2} alignItems="center">
                    {/* Product Image */}
                    <Grid item xs={3} sm={2}>
                      <img
                        src={item.images?.[0] || "https://via.placeholder.com/150"}
                        alt={item.name}
                        style={{
                          width: "100%",
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    </Grid>

                    {/* Product Info */}
                    <Grid item xs={9} sm={6}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        ${item.price.toFixed(2)}
                      </Typography>

                      {/* Quantity Selector */}
                      <Select
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item._id, e.target.value)
                        }
                        size="small"
                        sx={{ mr: 2 }}
                      >
                        {[...Array(10).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>

                      {/* Remove Button */}
                      <IconButton
                        color="error"
                        onClick={() => handleRemove(item._id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>

                    {/* Price (right side) */}
                    <Grid item xs={12} sm={4} textAlign="right">
                      <Typography variant="subtitle1" fontWeight="bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))}

              <Button
                variant="outlined"
                color="error"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>
            </Paper>
          </Grid>

          {/* Summary Section */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2, backgroundColor: "#f9fafb" }}>
              <Typography variant="h6" gutterBottom>
                Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items):{" "}
                <strong>${subtotal.toFixed(2)}</strong>
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 2, borderRadius: 2 }}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CartPage;
