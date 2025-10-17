const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();


router.get('/listall', UserController.listAll);

module.exports = router;