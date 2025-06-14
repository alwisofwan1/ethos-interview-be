const School = require('../models/School');

const createSchool = async (req, res) => {
  try {
    const { name, address, logo, phone, email, admin } = req.body;
    const school = await School.create({
      name,
      address,
      logo,
      phone,
      email,
      admin,
    });
    res.status(201).json({ success: true, school });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json({ success: true, schools });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await School.findByIdAndUpdate(id, req.body, { new: true });
    if (!school)
      return res
        .status(404)
        .json({ success: false, message: 'School not found' });
    res.status(200).json({ success: true, school });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await School.findByIdAndDelete(id);
    if (!school)
      return res
        .status(404)
        .json({ success: false, message: 'School not found' });
    res.status(200).json({ success: true, message: 'School deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createSchool, getSchools, updateSchool, deleteSchool };
