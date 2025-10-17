const { PrismaClient } = require('@prisma/client');
const { encrypt, decrypt } = require('./hash'); // seu módulo de criptografia

const prisma = new PrismaClient();

// ------------------- 1️⃣ Buscar usuário -------------------
async function getUserByUser(username) {
    try {
        const user = await prisma.user.findUnique({
            where: { username }
        });
        return user; // retorna o objeto completo ou null
    } catch (err) {
        console.error('Erro ao buscar usuário:', err);
        return null;
    }
}

// ------------------- 2️⃣ Login / autenticação -------------------
async function login({ username, senha }) {
    try {
        const user = await getUserByUser(username);
        if (!user) return false;

        // Comparar senha usando sua criptografia
        const decryptedPassword = decrypt(user.password);
        if (decryptedPassword === senha) {
            return true; // retorna usuário se correto
        }
        return false;
    } catch (err) {
        console.error('Erro no login:', err);
        return false;
    }
}

module.exports = {
    getUserByUser,
    login
};
