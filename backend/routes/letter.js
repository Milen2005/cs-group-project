const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const { generateLetterText, generateLetterPDF } = require('../utils/letterTemplate');
const User = require('../models/User');
const Letter = require('../models/Letter');

// POST /api/letter - generate a dispute letter as PDF and save record
router.post('/', verifyToken, async (req, res) => {
  try {
    const { landlordName, propertyAddress, violation } = req.body;

    if (!landlordName || !propertyAddress || !violation) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await User.findById(req.user.id);

    // 1. Generate the letter text
    const letterText = generateLetterText({
      tenantName: user.name,
      landlordName,
      propertyAddress,
      violation,
    });

    // 2. Save letter record to MongoDB
    await Letter.create({
      userId: req.user.id,
      landlordName,
      propertyAddress,
      violation,
      letterText,
    });

    // 3. Convert letter text to PDF
    const pdfBuffer = generateLetterPDF(letterText);

    // 4. Send PDF back as a downloadable file
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="dispute-letter.pdf"',
    });
    res.send(pdfBuffer);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/letter - get all letters for logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const letters = await Letter.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(letters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;