const express = require('express');
const router = express.Router();
const db = require('../database');

// Function to generate a random alphanumeric code
const generateCode = (length = 8) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

router.post('/generate', (req, res) => {
    const { role } = req.body;

    if (!role || (role !== 'student' && role !== 'teacher')) {
        return res.status(400).json({ msg: 'Please provide a valid role (student or teacher)' });
    }

    const code = generateCode();

    const newInvitation = {
        code,
        role,
        is_used: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    db.query('INSERT INTO invitations SET ?', newInvitation, (error, result) => {
        if (error) throw error;
        res.status(201).json({
            msg: 'Invitation code generated',
            invitationCode: code,
            role
        });
    });
});

module.exports = router;
