const UserRepository = require('../../repositories/user.repository');
const { encrypt } = require('../../utils/crypto');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime/library');

// Definição do CustomError (que será exportado para uso no Controller)
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'CustomError';
    }
}

const updateUserService = async (id, username, password, question, answer, adm) => {
    const userId = Number(id);

    // 1. Validação de ID (para o caso do Controller falhar ou ser bypassado)
    if (isNaN(userId) || userId <= 0) {
        throw new CustomError('ID de usuário inválido.', 400);
    }
    
    // 2. Prepara os dados: Filtra campos nulos/vazios
    let updateData = {};
    if (username !== undefined && username !== null) updateData.username = username;
    if (question !== undefined && question !== null) updateData.question = question;
    if (answer !== undefined && answer !== null) updateData.answer = answer;
    if (adm !== undefined && adm !== null) updateData.adm = adm;

    // 3. Aplica Regra de Negócio: Criptografa a senha, se fornecida
    if (password) {
        updateData.password = encrypt(password);
    }
    
    // Se não houver dados para atualizar além do ID, lança um erro
    if (Object.keys(updateData).length === 0) {
        throw new CustomError('Nenhum dado fornecido para atualização.', 400);
    }

    try {
        // 4. Chama o Repository:
        // O Repository deve ser chamado com o ID e o objeto de dados (update(id, data))
        const user = await UserRepository.updateUser(userId, updateData); // Usando 'update' conforme o Repository
        // Se seu Repository tem o nome updateUser e recebe todos os campos separadamente, use:
        // const user = await UserRepository.updateUser(userId, username, updateData.password, question, answer, adm);
        
        return user;
    } catch (error) {
        // 5. Tratamento de Erros de Domínio (Prisma)
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new CustomError(`Usuário com ID ${userId} não encontrado para atualização.`, 404);
        }
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
             throw new CustomError(`O nome de usuário "${username}" já está em uso.`, 409);
        }
        throw error;
    }
};

// Exporta AMBOS para que o Controller possa pegá-los.
module.exports = { updateUserService, CustomError };

module.exports = {
    async updateUserService(id, username, password, question, answer, adm){
        
    }
}