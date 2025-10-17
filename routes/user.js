// routes/user.routes.js

const express = require('express');
const { login } = require('../controller/login');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Se for usar as rotas de login
const { getAllUsers, getUserById, updateUser, createUser, deleteUser, getUserByUsername } = require('../controller/user')
const bcrypt = require('bcrypt')
// Exemplo: no user.routes.js ou user.js



const { prisma } = require('../server');
const JWT_SECRET = process.env.JWT_SECRET; // Variável secreta (se usada)


router.post('/login', async (req, res) => {
    try {
        const { username, senha } = req.body;
        login(username, senha) ? res.status(200).json({ message: " deu certo essa merda" }) : res.status(400).json({ message: "nao deu certo essa merda" })
    } catch (error) {
        console.log(error);
    }

});

router.post('/create', async (req, res) => {
    // 1. CAPTURA DOS DADOS: Pega todos os dados necessários do corpo da requisição
    const { username, password, question, answer, adm } = req.body;

    // 2. VALIDAÇÃO BÁSICA: Verifica campos obrigatórios
    if (!username || !password) {
        return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios.' });
    }

    try {
        // 3. CHAMA A FUNÇÃO DE SERVIÇO: Espera o resultado da criação
        const newUser = await createUser({ username, password, question, answer, adm });

        // 4. SUCESSO: Retorna o usuário criado com status 201
        res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
            user: newUser
        });

    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);

        // TRATAMENTO DE ERROS CUSTOMIZADOS (400 Bad Request)
        // Se o controller jogou um erro com statusCode (como o erro P2002), usamos ele.
        if (error.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        // ERRO INTERNO GENÉRICO (500)
        res.status(500).json({ error: 'Erro interno ao processar o cadastro.' });
    }
});


// ------------------- ROTA: 2. EDITAR Usuário (PUT /user/:id) -------------------
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    // Captura todos os dados que podem vir no corpo
    const updateFields = req.body;

    // O objeto 'updateFields' contém apenas os campos que vieram no body.
    // NÃO FAZEMOS MAIS O HASHING AQUI, POIS A FUNÇÃO 'updateUser' FAZ ISSO.

    try {
        const userId = parseInt(id, 10);

        // 1. Validação do ID (Melhor manter na rota, já que é um parâmetro HTTP)
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'O ID de usuário fornecido é inválido.' });
        }

        // 2. CHAMA A FUNÇÃO DE SERVIÇO: Passa o ID (número) e o objeto de dados.
        const updatedUser = await updateUser(userId, updateFields);

        // 3. SUCESSO: O controller já removeu a senha do objeto de retorno.
        res.status(200).json({
            message: 'Usuário atualizado com sucesso!',
            user: updatedUser
        });

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);

        // 4. TRATAMENTO DE ERROS DO CONTROLLER
        // A função updateUser lança erros com códigos customizados (USER_NOT_FOUND, USERNAME_TAKEN).

        if (error.code === 'USER_NOT_FOUND') {
            return res.status(404).json({ error: error.message });
        }
        if (error.code === 'USERNAME_TAKEN') {
            return res.status(400).json({ error: error.message });
        }

        // Erro interno genérico
        res.status(500).json({ error: 'Erro interno ao processar a atualização.' });
    }
});

//ROTA PARA CONSULTAR TODOS OS USUARIOS:
router.get('/all', async (req, res) => {
    try {
        const users = getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao buscar todos os usuários:", error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});

router.get('/search', async (req, res) => {
    // 1. Pega o ID do query parameter 'id' (ex: /user/search?id=1)
    const idParam = req.query.id;

    if (!idParam) {
        return res.status(400).json({ error: 'O parâmetro id é obrigatório. Use /user/search?id=NUM' });
    }

    const userId = parseInt(idParam, 10);

    // 2. Validação básica do ID
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'O ID fornecido é inválido.' });
    }

    try {
        // 3. CHAMA A FUNÇÃO DE SERVIÇO:
        const user = await getUserById(userId);

        // 4. TRATAMENTO DO RESULTADO (Verifica se o usuário existe)
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado com o ID fornecido.' });
        }

        // 5. RESPOSTA:
        res.status(200).json(user);

    } catch (error) {
        // Tratamento de erro genérico (qualquer falha de conexão ou erro do servidor)
        console.error("Erro ao buscar usuário por id:", error);
        res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
});

// Rota para buscar por "name" (query param: ?name=termo)

router.get('/search/name', async (req, res) => {
    // 1. Pega o termo de busca e remove espaços em branco no início/fim
    const searchTerm = req.query.name ? req.query.name.trim() : '';

    // 2. Validação: Verifica se o termo existe e não é apenas uma string vazia
    if (!searchTerm) {
        return res.status(400).json({
            error: 'O parâmetro de busca (name) é obrigatório. Use /user/search/name?name=termo'
        });
    }

    try {
        // 3. CHAMA A FUNÇÃO DE SERVIÇO: Delega a busca ao controller
        const users = await searchUsersByUsername(searchTerm);

        // 4. TRATAMENTO DO RESULTADO (Verifica se encontrou algo)
        if (users.length === 0) {
            return res.status(404).json({
                message: `Nenhum usuário encontrado com o termo '${searchTerm}'.`
            });
        }

        // 5. RESPOSTA: Retorna a lista de usuários
        res.status(200).json(users);

    } catch (error) {
        // Tratamento de erro genérico (falha de conexão, erro do servidor, etc.)
        console.error("Erro ao buscar usuários por nome:", error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});
// ------------------- ROTA: 3. REMOVER Usuário (DELETE /user/:id) -------------------
// ROTA PARA REMOVER USUÁRIO (DELETE /user/delete/:id)
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'O ID de usuário fornecido é inválido.' });
    }

    try {
        const removedUser = await deleteUser(userId);
        res.status(200).json({
            message: 'Usuário removido com sucesso!',
            user: removedUser
        });
    } catch (error) {
        if (error && (error.code === 'USER_NOT_FOUND' || error.code === 'P2025')) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro ao remover o usuário.' });
    }
});
// EXPORTAÇÃO (OBRIGATÓRIO)
module.exports = router;