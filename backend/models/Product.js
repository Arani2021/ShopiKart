const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  discountPrice: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Books', 'Fashion', 'Home', 'Toys', 'Sports', 'Beauty', 'Others']
  },
  brand: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  images: [{
    type: String,
    required: true
  }],
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
