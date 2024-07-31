const express = require('express');
const router = express.Router();
const { User, Resource } = require('../models/userModel');
const auth = require('../middleware/isLoged');
const admin = require('../middleware/admin'); // Import the admin middleware

// Get all users
router.get('/users', auth, admin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add resources
router.post('/resources', auth, admin, async (req, res) => {
  const { type, title, description, sourceLink } = req.body;
  try {
      const newResource = new Resource({ type, title, description, sourceLink });
      await newResource.save();
      res.status(201).json(newResource);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Get resources
router.get('/resources', auth, admin, async (req, res) => {
  try {
      const resources = await Resource.find();
      res.json(resources);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

module.exports = router;


// module.exports = adminRoutes;