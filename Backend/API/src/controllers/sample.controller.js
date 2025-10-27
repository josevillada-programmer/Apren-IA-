const sampleService = require('../services/sample.service');

const createSample = async (req, res) => {
  try {
    const sample = await sampleService.createSample(req.body);
    res.status(201).json(sample);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSamples = async (req, res) => {
  try {
    const samples = await sampleService.getAllSamples();
    res.status(200).json(samples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSampleById = async (req, res) => {
  try {
    const sample = await sampleService.getSampleById(req.params.id);
    if (!sample) {
      return res.status(404).json({ message: 'Sample not found' });
    }
    res.status(200).json(sample);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSample = async (req, res) => {
  try {
    const sample = await sampleService.updateSample(req.params.id, req.body);
    if (!sample) {
      return res.status(404).json({ message: 'Sample not found' });
    }
    res.status(200).json(sample);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSample = async (req, res) => {
  try {
    const sample = await sampleService.deleteSample(req.params.id);
    if (!sample) {
      return res.status(404).json({ message: 'Sample not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSample,
  getAllSamples,
  getSampleById,
  updateSample,
  deleteSample,
};