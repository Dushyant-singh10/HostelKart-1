const Transaction = require('../models/Transaction.model');
const Item = require('../models/Item.model');

exports.createTransaction = async (req, res) => {
    const { itemId, buyerId } = req.body;

    try {
        const item = await Item.findById(itemId);
        if (!item || !item.available) {
            return res.status(400).json({ message: 'Item not available' });
        }

        const transaction = await Transaction.create({
            item: itemId,
            seller: item.owner,
            buyer: buyerId,
            price: item.price,
            status: 'Completed',
            dealDate: new Date()
        });

        // Mark item as not available
        item.available = false;
        await item.save();

        res.status(201).json({ message: 'Transaction successful', transaction });
    } catch (err) {
        res.status(500).json({ message: 'Transaction failed' });
    }
};

exports.getMyTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $or: [{ seller: req.user.id }, { buyer: req.user.id }]
        }).populate('item seller buyer');

        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch transactions' });
    }
};
