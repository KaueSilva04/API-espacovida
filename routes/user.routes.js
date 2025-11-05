
const express = require('express');
const router = express.Router();

const { listAll } = require('../controllers/usercontroller/listAllUsers.Controller');
const { create } = require('../controllers/usercontroller/createUser.Controller');
const { deleteUser } = require('../controllers/usercontroller/deleteUser.Controller');
const { listUserById } = require('../controllers/usercontroller/listUserById.Controller');
const { listUserByName } = require('../controllers/usercontroller/listUserByName.Controller');
const { loginUser } = require('../controllers/usercontroller/loginUser.Controller');
const { logoutUser } = require('../controllers/usercontroller/logoutUser.Controller');
const  middleware  = require('../utils/middleware');
const { resetPasswordUser } = require('../controllers/usercontroller/resetPassword.Controller');

const notImplemented = (req, res) =>
  res.status(501).json({ status: 'err', message: 'Rota não implementada' });

router.get('/test', (req, res) => {
  res.json({ message: 'user routes ok' });
});

//  Implementada
router.get('/listall', middleware.authMiddleware(), listAll);
router.post('/register', middleware.authMiddleware(true),  create);
router.delete('/',  middleware.authMiddleware(true),  deleteUser);
router.get('/listid', middleware.authMiddleware(), listUserById);
router.get('/listname', middleware.authMiddleware(), listUserByName);
router.post('/login',  loginUser);
router.post('/logout', middleware.authMiddleware(), logoutUser);
router.put('/resetpassword', middleware.authMiddleware(),  resetPasswordUser);




module.exports = router;
