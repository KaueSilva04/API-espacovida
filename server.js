const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'erro', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
