const NewsPost = require('../Model/NewsPost');
const messages = require('../Utilities/Message')

const createNewsPost = async (req, res) => {
  const { headline, shortDescription, fullDescription, image, category, isBreaking } = req.body;

  try {
    if (isBreaking) {
      const activeBreakingNews = await NewsPost.findOne({
        isBreaking: true,
        breakingCreatedAt: { $gte: new Date(Date.now() - 48 * 60 * 60 * 1000) }
      });
      if (activeBreakingNews) {
        return res.status(400).json({ error: messages.NEWS.BREAKING_EXISTS });
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
    res.status(201).json({ message: messages.NEWS.CREATED, newsPost});

  } catch (err) {
    console.error('Error saving news post:', err);
    res.status(500).json({ error: messages.NEWS.CREATION_FAILED })  }
};

module.exports = { createNewsPost }
