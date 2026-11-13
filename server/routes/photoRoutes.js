const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const upload = require('../middleware/upload');
const { photoSchema, validate } = require('../middleware/validation');

router.get('/', photoController.getAll);
router.get('/:id', photoController.getOne);
router.post('/', upload.single('photo'), validate(photoSchema), photoController.create);
router.delete('/:id', photoController.remove);

module.exports = router;