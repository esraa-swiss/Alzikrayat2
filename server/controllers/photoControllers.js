const fs = require('fs');
const path = require('path');
const Photo = require('../models/Photo');

exports.getAll = async (req, res, next) => {
  try {
    const photos = await Photo.find().sort({ dateTime: -1 });
    res.status(200).json(photos);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    res.status(200).json(photo);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const { title, description, userId } = req.body;

    const photo = await Photo.create({
      userId,
      fileName: req.file.filename,
      title,
      description,
    });

    res.status(201).json(photo);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    const requesterId = req.body.userId;
    if (!requesterId || photo.userId.toString() !== requesterId) {
      return res.status(403).json({ message: 'You can only delete your own photos' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', photo.fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await photo.deleteOne();
    res.status(200).json({ message: 'Photo deleted' });
  } catch (err) {
    next(err);
  }
};