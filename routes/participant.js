const express = require('express');

const router = express.Router();


// GET all test participants
router.get('/test', (req, res) => {
    res.json({ message: 'teste rodando' });
});


module.exports = router;