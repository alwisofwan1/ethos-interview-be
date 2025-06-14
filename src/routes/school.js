const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/school');
const verifyToken = require('../config/jwt'); // verify token before accessing this route

router.post('/school', verifyToken, schoolController.createSchool);

router.get('/school', verifyToken, schoolController.getSchools);

router.put('/school/:id', verifyToken, schoolController.updateSchool);

router.delete('/school/:id', verifyToken, schoolController.deleteSchool);

module.exports = router;
