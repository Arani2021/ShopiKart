import { Box, Typography, Grid, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#288812ff", color: "white", mt: 5, pt: 4, pb: 2 }}>
      <Typography
        align="center"
        sx={{ mb: 2, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
      >
        Back to top
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={6} sm={3}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            Get to Know Us
          </Typography>
          <Link href="#" color="inherit" underline="hover">About</Link><br />
          <Link href="#" color="inherit" underline="hover">Careers</Link>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            Connect with Us
          </Typography>
          <Link href="#" color="inherit" underline="hover">Facebook</Link><br />
          <Link href="#" color="inherit" underline="hover">Twitter</Link><br />
          <Link href="#" color="inherit" underline="hover">Instagram</Link>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            Shop with Us
          </Typography>
          <Link href="#" color="inherit" underline="hover">Your Orders</Link><br />
          <Link href="#" color="inherit" underline="hover">Cart</Link><br />
          <Link href="#" color="inherit" underline="hover">Rentals</Link>
        </Grid>
      </Grid>

      <Typography align="center" sx={{ mt: 3, fontSize: 12, color: "#ccc" }}>
        © 2025 ShopiKart • Designed with ❤️ and care.
      </Typography>
    </Box>
  );
};

export default Footer;
