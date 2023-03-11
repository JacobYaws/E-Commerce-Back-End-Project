const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// This route finds all of the categories that are stored in the database and displays them in the api response.
router.get('/', async (req, res) => {
  //// find all categories
  //// be sure to include its associated Products
  const categoryData = await Category.findAll({
     include: {
      model: Product
     }
  }).catch((err) => {
    res.json(err);
  });
  res.json(categoryData);
});

// This route finds a category by a specific id that is provided in the url (/api/categories/1). If a valid match is found, it will display that category and the associated products with the category in the api response.
router.get('/:id', async (req, res) => {
  //// find one category by its `id` value
  //// be sure to include its associated Products
  const categoryData = await Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model:  Product
     },
    
  });
  res.json(categoryData);
});

// This route is used to create a new category. If there is a category_id and/or category_name in the request, it will use those for the new category in the database.
router.post('/', async (req, res) => {
  //// create a new category
  try {
    const categoryData = await Category.create({
      category_id: req.body.category_id,
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// This route is used to update a specific category by using its id. If there is a matching id, the body of the request will be used to update the category.
router.put('/:id', async (req, res) => {
  //// update a category by its `id` value
  Category.update(
    req.body,
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// This route is used to delete a specific category by using its id.
router.delete('/:id', async (req, res) => {
 // // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
