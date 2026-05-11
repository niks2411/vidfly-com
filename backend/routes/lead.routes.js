const router = require('express').Router();
const { createLead } = require('../controllers/lead.controller');

/**
 * @openapi
 * /api/leads:
 *   post:
 *     summary: Create a lead from form submission
 */
router.post('/', createLead);

module.exports = router;


