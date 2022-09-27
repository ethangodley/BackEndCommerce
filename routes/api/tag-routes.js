const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
function errorHandler (res) {
  return err => {
    console.log(err);
    res.status(500).json({
      error: "Unfortunately this cannot be done at this time, please try again later"
    })
  }
}

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      { model: Product,
        as: "product_tags" }
    ]
  }).then((tags) => {
    res.json(tags)
  }).catch(errorHandler(res));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [
      { model: Product,
        as: "product_tags" }
    ]
  }).then(tag => res.json(tag))
  .catch(errorHandler(res));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  }).then(tag => {
    res.json(tag)
  })
  .catch(errorHandler(res))
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{ 
    const update = await Tag.update({
      tag_name: req.body.tag_name,
    }, {
      where: {
        id: req.params.id,
      }
    }) 
    res.json("Tag has been updated")
  }catch(err){
    errorHandler(res)(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.json(deleteTag)
  }catch(err) {
    errorHandler(res)(err);
  }
});

module.exports = router;
