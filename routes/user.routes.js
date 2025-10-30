
const express = require('express');
const router = express.Router();

const { listAll } = require('../controllers/usercontroller/listAllUsers.Controller');
const { create } = require('../controllers/usercontroller/createUser.Controller');
const { deleteUser } = require('../controllers/usercontroller/deleteUser.Controller');
const { updateUser } = require('../controllers/usercontroller/updateUser.Controller');
const { listUserById } = require('../controllers/usercontroller/listUserById.Controller');
const { listUserByName } = require('../controllers/usercontroller/listUserByName.Controller');
const { loginUser } = require('../controllers/usercontroller/loginUser.Controller');


const notImplemented = (req, res) =>
  res.status(501).json({ status: 'err', message: 'Rota não implementada' });

router.get('/test', (req, res) => {
  res.json({ message: 'user routes ok' });
});

//  Implementada
router.get('/listall', (req, res, next) => listAll(req, res, next));
router.post('/register', (req, res, next) => create(req, res, next));
router.delete('/', (req, res, next) => deleteUser(req, res, next));
router.put('/', (req, res, next) => updateUser(req, res, next));
router.get('/listid', (req, res, next) => listUserById(req, res, next));
router.get('/listname', (req,res,next) => listUserByName(req, res, next));
router.post('/login', (req, res, next) => loginUser(req, res, next));





module.exports = router;
