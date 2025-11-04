const UserRepository = require('../../repositories/user.repository');

module.exports = {
    async updateUserService(id, username, adm) {

        if (!id || id <= 0) {
            const err = new Error("ID inválido ou não informado");
            err.statusCode = 400;
            throw err;
        }

        let updateData = {};
        if (username && username.trim()) updateData.username = username;
        if (adm !== undefined && adm !== null) updateData.adm = adm;

        if (Object.keys(updateData).length === 0) {
            const err = new Error("Nenhum campo válido para atualizar");
            err.statusCode = 400;
            throw err;
        }

        const existingUser = await UserRepository.getUserById(id);

        if (!existingUser) {
            const err = new Error("Usuário não encontrado");
            err.statusCode = 404;
            throw err;
        }

        const user = await UserRepository.updateUser(id, updateData);

        if (!user) {
            const err = new Error("Erro interno ao tentar atualizar usuário");
            err.statusCode = 500;
            throw err;
        }

        return user;
    }
}
