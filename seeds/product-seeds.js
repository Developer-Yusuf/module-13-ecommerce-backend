const { Product } = require('../models');

const productDetails = [
  {
    product_name: 'Checked Shirt',
    price: 12,
    stock: 100,
    category_id: 1,
  },
  {
    product_name: 'Khaki Jeans',
    price: 400,
    stock: 75.23,
    category_id: 5,
  },
  {
    product_name: 'Official Trouser',
    price: 100.25,
    stock: 123,
    category_id: 4,
  },
  {
    product_name: 'Gucci T-shirt',
    price: 35.65,
    stock: 503,
    category_id: 3,
  },
  {
    product_name: 'Blue Vest',
    price: 50.99,
    stock: 224,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productDetails);

module.exports = seedProducts;
