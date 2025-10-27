const express = require('express');
const connectDB = require('./src/config/database');
const sampleRoutes = require('./src/routes/sample.routes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/sample', sampleRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
