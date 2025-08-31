

const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminStats,
} = require('../controllers/adminController');


router.use(protect, admin);

router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .delete(deleteUser)
  .put(updateUserRole);

router.route('/products')
  .get(getAllProducts) 
  .post(createProduct);  

router.route('/products/:id')
  .put(updateProduct)    
  .delete(deleteProduct);   

// ==== STATS ====
router.get('/stats', getAdminStats);

module.exports = router;
