const categoriesSeed = require('./category-seeds');
const productsSeed = require('./product-seeds');
const tagsSeed = require('./tag-seeds');
const productTagsSeed = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  
  await categoriesSeed();
  

  await productsSeed();
  

  await tagsSeed();
  await productTagsSeed();

  console.log('\n----- ALL SEEDED -----\n');

  process.exit(0);
};

seedAll();
