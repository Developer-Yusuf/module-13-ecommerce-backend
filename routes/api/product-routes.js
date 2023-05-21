const route = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


// All products
route.get('/', async (req, res) => {
  // Get all products
  try {
    const productData = await Product.findAll({
    include: [
      { 
        model: Category,
        attributes:['id', 'category_name']
      },
      { 
        model: Tag,
        attributes:['id', 'tag_name']
      }
    ]
  });
  res.status(200).json(productData);
   } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Single Product
route.get('/:id', async (req, res) => {
 
  try {
    const productData = await Product.findByPk(req.params.id, {
    include: [
      { 
        model: Category,
        attributes:['id', 'category_name']
      },
      { 
        model: Tag,
        attributes:['id', 'tag_name']
      }
    ]
  });
  res.status(200).json(productData);
   } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Add new Product
route.post('/', (req, res) => {
    Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    tagIds: req.body.tag_id})
    .then((product) => {
  
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
     
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
route.put('/:id', (req, res) => {
  
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {

      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
    
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);


      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      
      res.status(400).json(err);
    });
});
// Remove Products
route.delete('/:id', async (req, res) => {
  
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ ERROR: 'Uknown Product ID' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = route;
