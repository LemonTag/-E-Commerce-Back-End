const router = require('express').Router();
const { Tag, Product } = require('../../models');


// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{
        model: Product,
        through: { attributes: [] }  // Exclude the ProductTag attributes from the result
      }]
    });
    res.status(200).json(allTags);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagById = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Product,
        through: { attributes: [Tag] }  
      }]
    });
    if (!tagById) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json(tagById);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
   
    const createtag = await Tag.create (req.body);
    res.status(200).json(createtag)
    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
   
  });

// update product
router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    console.log(`Received request to update tag with id: ${tagId}`);
    console.log(`Request body: ${JSON.stringify(req.body)}`);

    // First, check if the tag exists
    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      console.log(`Tag with id ${tagId} not found`);
      return res.status(404).json({ message: 'Tag not found' });
    }

    // Update the tag itself
    const [affectedRows] = await Tag.update(req.body, {
      where: {
        id: tagId,
      },
    });

    console.log(`Number of affected rows: ${affectedRows}`);

    // Fetch the updated tag
    const updatedTag = await Tag.findByPk(tagId);
    console.log('Updated Tag:', updatedTag);

    res.json(updatedTag);
  } catch (err) {
    console.error('Error updating tag:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});




router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteTag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
