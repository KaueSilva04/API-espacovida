const UserRepository = require('../../repositories/user.repository');

module.exports = {
    async getUserByNameService(username) {
        if (!username || typeof username !== 'string') {
            const err = new Error("Insira username como um string Obrigatoria");
            err.statusCode = 400;
            throw err;
        }

        const user = await UserRepository.getUserByName(username);

        if (!user) {
            const err = new Error("Erro interno ao tentar listar usuario");
            err.statusCode = 500;
            throw err;
        }

        return user;
    }

}