const UserRepository = require('../../repositories/user.repository');

module.exports = {
    async deleteUserService(id) {
        
        if (!id || id <= 0) {
            const err = new Error("id não informado ou valor negativo");
            err.statusCode = 400;
            throw err;
        }
        
        const existingUser = await UserRepository.getUserById(id);

        if (!existingUser) {
            const err = new Error("Usuário não encontrado");
            err.statusCode = 404;
            throw err;
        }

        const user = await UserRepository.deleteUser(id);

        if (!user) {
            const err = new Error("Erro interno ao tentar excluir usuários");
            err.statusCode = 500;
            throw err;
        }
        
        return user;
    }
}
