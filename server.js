require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('@prisma/client');
const  middleware  = require('./utils/middleware');

const app = express();
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();
module.exports.prisma = prisma;

const corsOptions = {
    origin: 'http://localhost:5173', // NÃO PODE SER '*'
    credentials: true // Permite que o frontend envie/receba cookies
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());




const indexRoutes = require('./routes/index');
const eventRoutes = require('./routes/event.routes');
const participantRoutes = require('./routes/participant.routes');
const userRoutes = require('./routes/user.routes');
const uploadRoutes = require('./routes/upload.routes');
const { listDasboard } = require('./controllers/home.Controller');

app.use('/', indexRoutes);
app.use('/event', eventRoutes);
app.use('/participant', participantRoutes);
app.use('/user', userRoutes);
app.use('/upload', uploadRoutes);
app.get('/dashboard',middleware.authMiddleware(), listDasboard);



app.get('/costumer', middleware.authMiddleware(), (req, res) => {
  res.json({ data: req.data });
});

app.get('/admin', middleware.authMiddleware(true), (req, res) => {
  res.json({ data: req.data});
});

app.use((req, res) => {
  res.status(404).json({ status: 'erro', message: 'Rota não encontrada' });
});

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
