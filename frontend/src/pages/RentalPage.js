

import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
//import Header from "../components/Header";

const rentalProducts = [
  { id: 1, name: "Canon DSLR Camera", image: "https://via.placeholder.com/250", rentPrice: 500, duration: "per day" },
  { id: 2, name: "MacBook Pro 16”", image: "https://via.placeholder.com/250", rentPrice: 1500, duration: "per day" },
  { id: 3, name: "PlayStation 5", image: "https://via.placeholder.com/250", rentPrice: 800, duration: "per day" },
  { id: 4, name: "Gaming Chair", image: "https://via.placeholder.com/250", rentPrice: 200, duration: "per day" },
  { id: 5, name: "Projector", image: "https://via.placeholder.com/250", rentPrice: 300, duration: "per day" },
];

const RentalPage = () => {
  return (
    <>
      {/* //<Header /> */}
      <Box sx={{ p: 3, backgroundColor: "background.default", minHeight: "100vh" }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
          Rent Products on ShopiKart
        </Typography>
        <Grid container spacing={3}>
          {rentalProducts.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  "&:hover": { boxShadow: 5, transform: "translateY(-5px)", transition: "0.3s" },
                }}
              >
                <CardMedia component="img" height="200" image={item.image} alt={item.name} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    From ₹{item.rentPrice} {item.duration}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ mt: 1, borderRadius: 2, "&:hover": { backgroundColor: "#2fa383" } }}
                  >
                    Rent Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default RentalPage;
