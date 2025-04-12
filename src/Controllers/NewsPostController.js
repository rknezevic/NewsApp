const NewsPost = require('../Model/NewsPost');

const createNewsPost = async (req, res) => {
  const { headline, shortDescription, fullDescription, image, category, isBreaking } = req.body;

  try {
    if (isBreaking) {
      const activeBreakingNews = await NewsPost.findOne({
        isBreaking: true,
        breakingCreatedAt: { $gte: new Date(Date.now() - 48 * 60 * 60 * 1000) }
      });
      if (activeBreakingNews) {
        return res.status(400).json({ error: 'There is already an active BREAKING NEWS.' });
      }
    }

    const newsPost = new NewsPost({
      headline,
      shortDescription,
      fullDescription,
      image,
      category,
      isBreaking,
      breakingExpiresAt: isBreaking ? new Date(Date.now() + 48 * 60 * 60 * 1000) : null,
      createdBy: req.user.id,
      lastEditedBy: req.user.id,
    });

    await newsPost.save();
    res.status(201).json({ message: "Post created successfully!", newsPost});

  } catch (err) {
    console.error('Error saving news post:', err);
    res.status(500).json({ error: 'Error creating a new post.', details: err.message })  }
};

module.exports = { createNewsPost }
