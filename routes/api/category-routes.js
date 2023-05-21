const route = require('express').Router();
const { Category, Product } = require('../../models');


//All Categories
route.get('/', async (req, res) => {
 
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
  });
  res.status(200).json(categoryData);
   } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Get a single category
route.get('/:id', async (req, res) => {
  
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ERROR: 'Uknown Category ID' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// New Category
route.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});
//Update Category
route.put('/:id', async (req, res) => {
    try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Delete Category
route.delete('/:id', async (req, res) => {

  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = route;
