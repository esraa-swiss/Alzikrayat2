const Comment = require('../models/Comment');
const Photo = require('../models/Photo');

exports.getByPhoto = async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    const comments = await Comment.find({ photoId: req.params.id }).sort({ dateTime: 1 });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    const { userId, comment } = req.body;
    const newComment = await Comment.create({
      photoId: req.params.id,
      userId,
      comment,
    });

    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
};