const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Head Gear',
  },
  {
    category_name: 'Pants',
  },
  {
    category_name: 'Sneakers',
  },
  {
    category_name: 'Boots',
  },
  {
    category_name: 'Brouses',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
