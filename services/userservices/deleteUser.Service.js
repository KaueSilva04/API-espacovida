const UserRepository = require('../../repositories/user.repository');

// 1. A classe CustomError precisa ser EXPORTADA
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'CustomError';
    }
}

const deleteUserService = async (id) => {
    const userId = Number(id);

    if (isNaN(userId) || userId <= 0) {
        throw new CustomError('ID de usuário inválido. O ID deve ser um número positivo.', 400);
    }
    
    // Verificação de existência antes de deletar
    const existingUser = await UserRepository.getUserById(userId);
    
    if (!existingUser) {
        throw new CustomError(`Usuário com ID ${userId} não encontrado para exclusão.`, 404);
    }

    // Usando o nome da função do seu repository: UserRepository.delete
    const user = await UserRepository.deleteUser(userId); 
    
    if (!user) {
        throw new CustomError('Falha ao excluir o usuário.', 500);
    }
    
    return user;
};

// 2. Exporta AMBOS em um objeto
module.exports = { deleteUserService, CustomError };