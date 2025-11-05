const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadcontroller/getUploadSignature.Controller.js');
const middleware = require('../utils/middleware.js');

router.get('/signature', middleware.authMiddleware(), uploadController.getUploadSignature);

module.exports = router;
