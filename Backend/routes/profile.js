const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../database');

// @route   GET api/profile
// @desc    Get user profile data
// @access  Private
router.get('/', auth, (req, res) => {
    const userId = req.user.id;

    // Get user info, stats, and lesson history from the database
    const getUserDataQuery = `
        SELECT 
            u.first_name, u.last_name, u.email, u.age, u.grade, u.role, p.last_login, u.created_at,
            p.current_level, p.completed_lessons, p.streak
        FROM users u
        LEFT JOIN progress p ON u.id = p.student_id
        WHERE u.id = ?;
    `;

    const getEvaluationsQuery = `
        SELECT type, score, created_at
        FROM evaluations
        WHERE student_id = ?
        ORDER BY created_at DESC
        LIMIT 5;
    `;

    db.query(getUserDataQuery, [userId], (error, userData) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }

        if (userData.length === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }

        db.query(getEvaluationsQuery, [userId], (error, evaluations) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Server error');
            }

            const totalScore = evaluations.reduce((acc, curr) => acc + curr.score, 0);
            const accuracy = evaluations.length > 0 ? (totalScore / (evaluations.length * 100)) * 100 : 0; // Assuming score is out of 100

            const profileData = {
                ...userData[0],
                accuracy: accuracy.toFixed(2),
                evaluations: evaluations
            };

            res.json(profileData);
        });
    });
});

// @route   PUT api/profile
// @desc    Update user profile
// @access  Private
router.put('/', auth, (req, res) => {
    const userId = req.user.id;
    const { first_name, last_name, age, grade } = req.body;

    const updatedUser = {
        first_name,
        last_name,
        age,
        grade,
        updated_at: new Date()
    };

    db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Server error' }); // Return JSON on error
        }
        res.json({ msg: 'Profile updated successfully' });
    });
});

module.exports = router;
