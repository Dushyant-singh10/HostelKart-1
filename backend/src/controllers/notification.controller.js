const Notification = require('../models/Notification.model');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch notifications' });
    }
};

exports.markAsRead = async (req, res) => {
    const { notificationId } = req.params;

    try {
        const notif = await Notification.findOne({ _id: notificationId, user: req.user.id });
        if (!notif) return res.status(404).json({ message: 'Notification not found' });

        notif.read = true;
        await notif.save();

        res.status(200).json({ message: 'Notification marked as read' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to mark notification as read' });
    }
};
