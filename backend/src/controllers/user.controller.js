const User = require('../models/User.model');
const Item = require('../models/Item.model');

// GET /api/users/profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
};

// GET /api/users/items
exports.getMyItems = async (req, res) => {
    try {
        const items = await Item.find({ owner: req.user.id });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: 'Could not fetch your items' });
    }
};
