const UserRepository = require('../../repositories/user.repository');

module.exports = {
    async updateUserService(id, username, password, question, answer, adm) {

        let UpdateData = [];
        if (username) updateData.username = username;
        if (question) updateData.question = question;
        if (answer) updateData.answer = answer;

        if (Object.keys(updateData).length === 0) {
            const err = new Error("Todos os campos vazios");
            err.statusCode = 400;
            throw err;
        }

        const user = UserRepository.updateUser(id, updateData);


        if (!user) {
            const err = new Error("Erro interno ao tentar listar usuario");
            err.statusCode = 500;
            throw err;
        }

        return user

    }
}