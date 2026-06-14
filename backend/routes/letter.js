const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const generateLetter = require('../utils/letterTemplate');
const User = require('../models/User');

// POST /api/letter - generate a dispute letter
router.post('/', verifyToken, async (req, res) => {
  try {
    const { landlordName, propertyAddress, violation } = req.body;

    if (!landlordName || !propertyAddress || !violation) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await User.findById(req.user.id);

    const letterText = generateLetter({
      tenantName: user.name,
      landlordName,
      propertyAddress,
      violation,
    });

    res.status(200).json({ letter: letterText });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;