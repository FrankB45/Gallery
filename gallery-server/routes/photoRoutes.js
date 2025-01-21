const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getStarredPhotos,
  getAllPhotos,
  uploadPhoto,
  updatePhoto,
  getPhotoFile,
} = require('../controllers/photoController');

// Public routes (if needed, but might want to protect them)
router.get('/starred', getStarredPhotos);
router.get('/all', getAllPhotos);
router.get('/file/:filename', getPhotoFile);

// Protected routes for admin (upload, update)
router.post('/upload', authMiddleware, upload.single('photo'), uploadPhoto);
router.put('/:id', authMiddleware, updatePhoto);

module.exports = router;