const Item = require('../models/Item.model');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find({ available: true }).populate('owner', 'name hostelName');
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching items' });
    }
};

exports.createItem = async (req, res) => {
    const { title, description, images, price, condition, category } = req.body;

    try {
        const newItem = await Item.create({
            title,
            description,
            images,
            price,
            condition,
            category,
            available: true,
            owner: req.user.id,
            postedAt: new Date()
        });

        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ message: 'Error creating item' });
    }
};
