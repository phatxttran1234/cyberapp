const express = require('express');
const router = express.Router();
const Post = require('./models/Post');
const { sequelize } = require('./db');

// Create a new post
router.post('/', async (req, res) => {
  const { userId, title, content } = req.body;

  try {
    const post = await sequelize.transaction(async (transaction) => {
      const newPost = await Post.create({ userId, title, content }, { transaction });
      console.log('Post created:', newPost.toJSON());
      return newPost;
    });

    res.json(post);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.error('Error adding post: Title already exists.');
      res.status(409).send('Title already exists');
    } else {
      console.error('Error creating post:', error);
      res.status(500).send('Error creating post');
    }
  }
});

module.exports = router;