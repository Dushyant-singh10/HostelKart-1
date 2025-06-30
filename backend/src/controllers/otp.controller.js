const Otp = require('../models/Otp.model');
const sendEmail = require('../utils/mailer');
const crypto = require('crypto');

exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        await Otp.create({
            email,
            otp: otpCode,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
            used: false
        });

        await sendEmail(email, 'Your HostelKart OTP', `Your OTP is: ${otpCode}`);

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (err) {
        res.status(500).json({ message: 'Could not send OTP' });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const record = await Otp.findOne({ email, otp, used: false });

        if (!record || record.expiresAt < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        record.used = true;
        await record.save();

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (err) {
        res.status(500).json({ message: 'OTP verification failed' });
    }
};
