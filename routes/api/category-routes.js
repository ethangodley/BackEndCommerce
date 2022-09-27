const router = require('express').Router();
const { Category, Product } = require('../../models');

function errorHandler (res) {
  return err => {
    console.log(err);
    res.status(500).json({
      error: "Unfortunately this cannot be done at this time, please try again later"
    })
  }
}
// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      { model: Product }
    ]
  }).then((categories) => {
    res.json(categories)
  }).catch(errorHandler(res));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [
      {model: Product}
    ]
  }).then(category => res.json(category))
  .catch(errorHandler(res));
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  }).then(category => {
    res.json(category)
  })
  .catch(errorHandler(res))
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{ 
  const update = await Category.update({
    category_name: req.body.category_name,
  }, {
    where: {
      id: req.params.id,
    }
  }) 
  res.json("category id " + req.params.id + " has been updated")
}catch(err){
  errorHandler(res)(err)
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
  const deleteCat = await Category.destroy({
    where: {
      id: req.params.id,
    }
  })
  res.json(deleteCat)
}catch(err) {
  errorHandler(res)(err);
}
});

module.exports = router;
