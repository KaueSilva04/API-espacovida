const UserRepository = require('../../repositories/user.repository');

// 💡 Defina ou importe esta classe de um local central.
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'CustomError';
    }
}

async function listUserByIdService(id) {
    const userId = Number(id);

    // Validação de Entrada: O ID deve ser um número positivo.
    if (isNaN(userId) || userId <= 0) {
        throw new CustomError('ID de usuário inválido. O ID deve ser um número positivo.', 400);
    }

    // O repositório já está como 'getUserById' no seu código.
    const user = await UserRepository.getUserById(userId); 
    
    // Tratamento de Erro de Domínio: Usuário não encontrado.
    if (!user) {
        throw new CustomError(`Usuário com ID ${userId} não encontrado.`, 404);
    }
    
    return user;
}

// Exporta a função e a classe de erro
module.exports = { listUserByIdService, CustomError };