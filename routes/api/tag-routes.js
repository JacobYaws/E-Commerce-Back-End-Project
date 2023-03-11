const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// This route finds all of the tags that are stored in the database and displays them in the api response.
router.get('/', async (req, res) => {
  //// find all tags
  //// be sure to include its associated Product data
  const tagData = await Tag.findAll({
    include: {
    model: Product
  },
 }).catch((err) => {
   res.json(err);
 });
  res.json(tagData);
});

// This route finds a tag by a specific id that is provided in the url (/api/tags/1). If a valid match is found, it will display that tag and the associated products with the tag in the api response.
router.get('/:id', async (req, res) => {
  //// find a single tag by its `id`
  //// be sure to include its associated Product data
  const tagData = await Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model:  Product
     },
    
  });
  res.json(tagData);
});

// This route is used to create a new tag. If there is a tag_id and/or tag_name in the request, it will use those for the new tag in the database.
router.post('/', async (req, res) => {
  //// create a new tag
  try {
    const tagData = await Tag.create({
      tag_id: req.body.tag_id,
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// This route is used to update a specific tag by using its id. If there is a matching id, the body of the request will be used to update the tag.
router.put('/:id', async (req, res) => {
  //// update a tag's name by its `id` value
  Tag.update(
    req.body,
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// This route is used to delete a specific tag by using its id.
router.delete('/:id', (req, res) => {
  //// delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedProduct) => {
      res.json(deletedProduct);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
