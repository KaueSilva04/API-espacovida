const UserRepository = require('../../repositories/user.repository');
const { hashPassword } = require('../../utils/crypto');



module.exports = {
    async createUserService(username, password, question, answer, adm){
        if (!question || typeof question !== 'string' || question.trim().length === 0) {
            throw new Error('question inválida: informe a pergunta de segurança.');
        }
        if (!answer || typeof answer !== 'string' || answer.trim().length === 0) {
            throw new Error('answer inválida: informe a resposta de segurança.');
        }
        if (typeof adm !== 'boolean') {
            adm = false;
        }
        password =  await hashPassword(password);
        const user = await UserRepository.createUser(username, password, question, answer, adm);
        return user;
    }
}