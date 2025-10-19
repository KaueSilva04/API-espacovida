require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();
module.exports.prisma = prisma;

app.use(express.json());

const indexRoutes = require('./routes/index');
const eventRoutes = require('./routes/event.routes');
const participantRoutes = require('./routes/participant.routes');
const userRoutes = require('./routes/user.routes');

<<<<<<< HEAD

app.use(indexRoutes);
app.use(eventRoutes);
app.use('/participant', participantRoutes); 
app.use("/event", eventRoutes);
=======
app.use('/', indexRoutes);
app.use('/event', eventRoutes);
app.use('/participant', participantRoutes);
app.use('/user', userRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 'erro', message: 'Rota não encontrada' });
});
>>>>>>> 198bea70d4397840977dde3b4b2361bbd54a2beb

app.use((err, req, res, next) => {
  console.error('ERRO GLOBAL:', err.stack);
  res.status(500).json({ status: 'erro', message: err.message });
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('\nPrisma Client desconectado. Servidor encerrado.');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
