const express = require('express');
const router = express.Router();
const sampleController = require('../controllers/sample.controller');

// Create a new sample
router.post('/', sampleController.createSample);

// Get all samples
router.get('/', sampleController.getAllSamples);

// Get a single sample by ID
router.get('/:id', sampleController.getSampleById);

// Update a sample by ID
router.put('/:id', sampleController.updateSample);

// Delete a sample by ID
router.delete('/:id', sampleController.deleteSample);

module.exports = router;