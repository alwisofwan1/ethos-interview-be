const express = require('express');
const router = express.Router();
const procurementController = require('../controllers/procurement');
const verifyToken = require('../config/jwt');

router.post(
  '/procurement',
  verifyToken,
  procurementController.createProcurement
);

router.get('/procurement', verifyToken, procurementController.getProcurements);

router.patch(
  '/procurement/:id/paid',
  verifyToken,
  procurementController.markPaid
);

router.patch(
  '/procurement/:id/validate',
  verifyToken,
  procurementController.validateProcurement
);

module.exports = router;
