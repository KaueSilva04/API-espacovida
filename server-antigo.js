const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const UserRotas = require('./routes/user.routes')

app.use(express.json());

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'erro', message: err.message });
});

app.use('/user', UserRotas);


const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');


dotenv.config();


const prisma = new PrismaClient();

module.exports.prisma = prisma; 

process.on('SIGINT', async () => { 
    await prisma.$disconnect();
    console.log('\nPrisma Client desconectado. Servidor encerrado.');
    process.exit(0);
});


app.use(express.json()); 




app.use('/user', userRoutes); 


const eventRoutes = require('./routes/event');
const participantRoutes = require('./routes/participant');

app.use(indexRoutes);
app.use(eventRoutes);
app.use('/participant', participantRoutes); 
app.use("/event", eventRoutes);

app.use((err, req, res, next) => {
    console.error('ERRO GLOBAL:', err.stack);
    res.status(500).json({ status: 'erro', message: err.message });
});


// 5. INICIALIZAÇÃO
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
