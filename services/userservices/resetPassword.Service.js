const userRepository = require("../../repositories/user.repository");
const crypto = require('../../utils/crypto');

module.exports = {
    async resetPasswordService(username, password, answer) {

        if (!password || !username || !answer) {
            const err = new Error("Insira o id e a nova senha!!");
            err.statusCode = 400;
            throw err;
        }
        
        const userQuestion = await userRepository.getUserByName(username);
  
        if(!(await crypto.compare(answer, userQuestion.answer))){
            const err = new Error("resposta invalida");
            err.statusCode = 400;
            throw err;
        }

        let updateData = {};
        updateData.password = await crypto.hashPassword(password);

        const user = await userRepository.updateUser(userQuestion.id, updateData);

        if (!user) {
            const err = new Error("Erro interno ao tentar listar usuario");
            err.statusCode = 500;
            throw err;
        }

        return user;
    }
}
