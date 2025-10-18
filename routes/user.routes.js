
const express = require('express');
const router = express.Router();

const { listAll } = require('../controllers/usercontroller/listAllUsers.Controller');

const notImplemented = (req, res) =>
  res.status(501).json({ status: 'err', message: 'Rota não implementada' });

router.get('/test', (req, res) => {
  res.json({ message: 'user routes ok' });
});

//  Implementada
router.get('/listall', (req, res, next) => listAll(req, res, next));

// rotas ainda não têm controllers criados
 
router.post('/login', notImplemented);
router.post('/create', notImplemented);
router.put('/edit/:id', notImplemented);
router.get('/all', notImplemented);
router.get('/search', notImplemented);        
router.get('/search/name', notImplemented);  
router.delete('/delete/:id', notImplemented);

module.exports = router;
