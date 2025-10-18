const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const PORT = 3000;


app.use('/user',userRoutes );

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
