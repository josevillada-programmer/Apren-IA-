const Sample = require('../models/sample.model');

const createSample = async (data) => {
  return await Sample.create(data);
};

const getAllSamples = async () => {
  return await Sample.find();
};

const getSampleById = async (id) => {
  return await Sample.findById(id);
};

const updateSample = async (id, data) => {
  return await Sample.findByIdAndUpdate(id, data, { new: true });
};

const deleteSample = async (id) => {
  return await Sample.findByIdAndDelete(id);
};

module.exports = {
  createSample,
  getAllSamples,
  getSampleById,
  updateSample,
  deleteSample,
};