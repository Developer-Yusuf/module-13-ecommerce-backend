
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//Relationships

// Category includes product
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
// One to many rlshp
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL',
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  
  foreignKey: 'product_id'
})
// one to many
Tag.belongsToMany(Product, {
  through: ProductTag,
  
  foreignKey: 'tag_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
