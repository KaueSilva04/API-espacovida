const UserRepository = require('../../repositories/user.repository');

module.exports = {
    async updateUserService(id, username, question, answer, adm) {
        console.log('=== UPDATE USER SERVICE ===');
        console.log('Parâmetros:', { id, username, question, answer, adm });
        
        // ✅ Validar id
        if (!id || id <= 0) {
            const err = new Error("ID inválido ou não informado");
            err.statusCode = 400;
            throw err;
        }

        // ✅ Construir objeto com dados a atualizar
        let updateData = {};
        
        if (username && username.trim()) updateData.username = username;
        if (question && question.trim()) updateData.question = question;
        if (answer && answer.trim()) updateData.answer = answer;
        if (adm !== undefined && adm !== null) updateData.adm = adm;

        console.log('Dados para atualizar:', updateData);

        // ✅ Verificar se há dados para atualizar
        if (Object.keys(updateData).length === 0) {
            const err = new Error("Nenhum campo válido para atualizar");
            err.statusCode = 400;
            throw err;
        }

        // ✅ Verificar se usuário existe
        const existingUser = await UserRepository.getUserById(id);
        if (!existingUser) {
            const err = new Error("Usuário não encontrado");
            err.statusCode = 404;
            throw err;
        }

        // ✅ Atualizar usuário
        const user = await UserRepository.updateUser(id, updateData);

        if (!user) {
            const err = new Error("Erro interno ao tentar atualizar usuário");
            err.statusCode = 500;
            throw err;
        }

        console.log('Usuário atualizado com sucesso:', user);
        return user;
    }
}
