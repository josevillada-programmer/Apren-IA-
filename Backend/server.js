const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const invitationsRoutes = require('./routes/invitations');
const profileRoutes = require('./routes/profile');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/invitations', invitationsRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
