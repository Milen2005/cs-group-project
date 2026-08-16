const express    = require('express');
const router     = express.Router();
const multer     = require('multer');
const cloudinary = require('../config/cloudinary');
const verifyToken = require('../middleware/verifyToken');

// Multer - store file in memory temporarily
const storage = multer.memoryStorage();
const upload  = multer({ storage });

// POST /api/upload - upload lease PDF
router.post('/', verifyToken, upload.single('lease'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Convert file buffer to base64
    const base64File = req.file.buffer.toString('base64');
    const dataUri    = `data:${req.file.mimetype};base64,${base64File}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder:        'rentright/leases',
      resource_type: 'auto',
      type: 'upload',
      format: 'pdf',
      public_id:     `lease_${req.user.id}_${Date.now()}`,
    });

    res.status(200).json({
      message:  'Lease uploaded successfully',
      url:      result.secure_url,
      public_id: result.public_id,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;