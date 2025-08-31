

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Rating,
  CircularProgress,
  Alert,
  Box,
  IconButton,
  Snackbar,
} from "@mui/material";
import {
  ShoppingCart as CartIcon,
  FavoriteBorder as FavoriteIcon,
} from "@mui/icons-material";
import { fetchProducts } from "../features/productsSlice";
import { addToCart } from "../features/cartSlice";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { products, loading, error } = useSelector((state) => state.products);

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "All";

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const productList = Array.isArray(products) ? products : products?.products || [];

  const filteredProducts = productList.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "All" || product.category === selectedCategory)
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", pb: 5 }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 8 } }}>
        {/* Hero Banner */}
        <Box
          sx={{
            mb: 4,
            py: 6,
            textAlign: "center",
            background: "linear-gradient(135deg, #21c999ff 0%, #1b263b 100%)",
            borderRadius: 3,
            color: "#fff",
            boxShadow: 3,
          }}
        >
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Welcome to ShopiKart
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Explore products at fresh new deals
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : (
          <>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
              {searchTerm
                ? `Search Results for "${searchTerm}"`
                : selectedCategory !== "All"
                ? `${selectedCategory} Products`
                : "Featured Products"}
            </Typography>

            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      borderRadius: 3,
                      "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.images[0] || "https://via.placeholder.com/200"}
                      alt={product.name}
                      sx={{
                        height: 220,
                        objectFit: "cover",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        fontWeight={600}
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          minHeight: "3.6em",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          minHeight: "3em",
                          mb: 1,
                        }}
                      >
                        {product.description}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Rating
                          value={product.rating}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          ({product.numReviews || 0})
                        </Typography>
                      </Box>
                      <Typography variant="h6" color="secondary" fontWeight={700}>
                        ${product.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        p: 2,
                        pt: 0,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<CartIcon />}
                        onClick={() => handleAddToCart(product)}
                        sx={{
                          borderRadius: 2,
                          flex: 1,
                          mr: 1,
                          "&:hover": { backgroundColor: "#2fa383" },
                        }}
                      >
                        Add to Cart
                      </Button>
                      <IconButton sx={{ border: "1px solid #ccc", borderRadius: 2 }}>
                        <FavoriteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message="Product added to cart"
        />
      </Container>
    </Box>
  );
};

export default HomePage;
