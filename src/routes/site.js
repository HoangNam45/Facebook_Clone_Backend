const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
router.post('/register', siteController.register);

module.exports = router;