const UserRepository = require('../../repositories/user.repository');

module.exports = {
    async deleteUserService(id) {
        if (!id || id >= 0) {
            const err = new Error("id não informado ou valor negativo");
            err.statusCode = 400;
            throw err;
        }
        const existingUser = await UserRepository.getUserById(id);

        if (!existingUser) {
            const err = new Error("Usuario não encontrado");
            err.statusCode = 404;
            throw err;
        }

        const user = await UserRepository.deleteUserService(id);

        if (!user) {
            const err = new Error("Erro interno ao tentar excluir Usuarios");
            err.statusCode = 500;
            throw err;
        }
        return user;
    }

}