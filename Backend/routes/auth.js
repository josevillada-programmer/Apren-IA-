const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

router.post('/register', (req, res) => {
    const { email, password, first_name, last_name, nickname, age, grade } = req.body;

    if (!email || !password || !first_name || !last_name || !nickname) {
        return res.status(400).json({ msg: 'Please enter all required fields' });
    }

    db.query('SELECT email, nickname FROM users WHERE email = ? OR nickname = ?', [email, nickname], (error, userResults) => {
        if (error) throw error;

        if (userResults.length > 0) {
            if (userResults[0].email === email) {
                return res.status(400).json({ msg: 'User with that email already exists' });
            }
            if (userResults[0].nickname === nickname) {
                return res.status(400).json({ msg: 'That nickname is already taken' });
            }
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;

                const newUser = {
                    email,
                    password_hash: hash,
                    first_name,
                    last_name,
                    nickname,
                    role: 'student', // Default role
                    age,
                    grade,
                    is_verified: true, // Account is considered verified on creation
                    created_at: new Date(),
                    updated_at: new Date()
                };

                db.query('INSERT INTO users SET ?', newUser, (error, result) => {
                    if (error) throw error;
                    res.status(201).json({
                        msg: 'User registered successfully',
                        userId: result.insertId
                    });
                });
            });
        });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) throw error;

        if (results.length === 0) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
            if (err) throw err;

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            // Streak logic
            db.query('SELECT * FROM progress WHERE student_id = ?', [user.id], (error, progressResults) => {
                if (error) throw error;

                const now = new Date();
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

                let newStreak = 1;
                if (progressResults.length > 0) {
                    const lastLogin = new Date(progressResults[0].last_login);
                    const lastLoginDate = new Date(lastLogin.getFullYear(), lastLogin.getMonth(), lastLogin.getDate());

                    const diffTime = today - lastLoginDate;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays === 1) {
                        newStreak = progressResults[0].streak + 1;
                    } else if (diffDays > 1) {
                        newStreak = 1; // Reset streak
                    } else {
                        newStreak = progressResults[0].streak; // Keep streak if logging in on the same day
                    }
                }

                const progressData = {
                    student_id: user.id,
                    last_login: now,
                    streak: newStreak,
                    updated_at: now
                };

                if (progressResults.length > 0) {
                    db.query('UPDATE progress SET ? WHERE student_id = ?', [progressData, user.id], (error, results) => {
                        if (error) throw error;
                    });
                } else {
                    progressData.created_at = now;
                    db.query('INSERT INTO progress SET ?', progressData, (error, results) => {
                        if (error) throw error;
                    });
                }
            });

            db.query('SELECT streak FROM progress WHERE student_id = ?', [user.id], (error, progressResults) => {
                if (error) throw error;

                const streak = progressResults.length > 0 ? progressResults[0].streak : 0;

                const payload = {
                    user: {
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        streak: streak
                    }
                };

                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' },
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                    }
                );
            });
        });
    });
});

module.exports = router;
