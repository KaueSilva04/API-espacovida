const UserRepository = require('../../repositories/user.repository');
const { hashPassword } = require('../../utils/crypto');




module.exports = {
    async createUserService(username, password, question, answer, adm) {
        console.log(username + " " + password + " " + question + " " + answer + " " + adm);
        if (!username || !password || !question || !answer || adm === undefined || adm === null) {
            const err = new Error("Campos obrigatorios: username, password, question, answer, adm");
            err.statusCode = 400;
            throw err;
        }
        if (typeof username !== 'string' || typeof password !== 'string' || typeof question !== 'string' || typeof answer !== 'string' || typeof adm !== 'boolean') {
            const err = new Error("Tipos inválidos: 'username', 'password', 'question' e 'answer' devem ser strings, e 'adm' deve ser boolean");
            err.statusCode = 400;
            throw err;
        }

        password = await hashPassword(password);
        const user = await UserRepository.createUser(username, password, question, answer, adm);
        if (!user) {
            const err = new Error("Usuario nao cadastrado");
            err.statusCode = 400;
            throw err;
        }
        return user;
    }
}