const User = require('../models/User');
const Resource = require('../models/Resource');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createResource = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newResource = new Resource({ title, content, author: req.userId });
        await newResource.save();
        res.status(201).json(newResource);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
