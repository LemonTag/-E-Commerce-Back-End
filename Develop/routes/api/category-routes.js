const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allcategorys = await Category.findAll({
      include: [Product]
    })
    res.status(200).json(allcategorys)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categorysbyid = await Category.findOne({
      where: {
        id: req.params.id
      },
      include:[Product]
    })
    res.status(200).json(categorysbyid)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createcatorgy = await Category.create(req.body)
    res.status(200).json(createcatorgy)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatecatorgy = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updatecatorgy)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletecatorgy = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deletecatorgy)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
});

module.exports = router;
