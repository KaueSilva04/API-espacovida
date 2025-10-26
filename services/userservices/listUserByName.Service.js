const UserRepository = require('../../repositories/user.repository');

class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'CustomError';
    }
}

async function getUserByNameService(username) {
    if (!username || typeof username !== 'string' || username.trim() === '') {
        throw new CustomError('Nome de usuário inválido ou não fornecido.', 400);
    }

    const user = await UserRepository.getUserByName(username); 
    
    if (!user) {
        throw new CustomError(`Usuário "${username}" não encontrado.`, 404);
    }
    
    return user;
}

// Adapte as suas exportações existentes para incluir a nova função e o CustomError
module.exports = { 
    // ... outras funções de serviço (ex: deleteUser, updateUser) ...
    getUserByNameService, 
    CustomError 
};