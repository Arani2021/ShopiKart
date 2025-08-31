
import AdminLayout from "../../components/AdminLayout";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import {
  fetchAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../features/adminSlice';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin) || {};
  const { products = [], loading = false, error = null } = adminState;

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'Others',
    brand: '',
    stock: 0,
    images: [''],
  });

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleOpen = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        ...product,
        images: product.images?.length > 0 ? product.images : [''],
      });
    } else {
      setSelectedProduct(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'Others',
        brand: '',
        stock: 0,
        images: [''],
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      images: formData.images.length > 0 && formData.images[0] !== '' ? formData.images : ['/images/sample.jpg'],
    };

    if (selectedProduct) {
      dispatch(updateProduct({ id: selectedProduct._id, productData }));
    } else {
      dispatch(createProduct(productData));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

return (
  <AdminLayout>
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Products Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Add Product
        </Button>
      </Box>

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
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(product)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(product._id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              margin="normal"
              SelectProps={{ native: true }}
            >
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
              <option value="Toys">Toys</option>
              <option value="Sports">Sports</option>
              <option value="Beauty">Beauty</option>
              <option value="Others">Others</option>
            </TextField>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Image URL"
              name="images"
              value={formData.images[0] || ''}
              onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedProduct ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
   </Box>
  </AdminLayout>
);
};

export default AdminProducts;
