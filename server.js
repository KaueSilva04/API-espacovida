// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const indexRoutes = require('./routes/index');
const eventRoutes = require('./routes/event');
const participantRoutes = require('./routes/participant');

app.use(indexRoutes);
app.use(eventRoutes);
app.use('/participant', participantRoutes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'erro', message: err.message });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
