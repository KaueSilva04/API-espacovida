const { updateUserService, CustomError } = require('../../services/userservices/updateUser.Service');

module.exports = {
    async updateUser(req, res, next) {
        try {
            const { id, username } = req.body;            
            const updatedUser = await updateUserService(id, username);
            const { password: _, ...userWithoutPassword } = updatedUser;
            res.status(200).json({ status: "ok", message: "Usuário atualizado com sucesso", data: userWithoutPassword });
        } catch (err) {
            console.error("Erro ao tentar atualizar as informacoes do usuario: " + err);
            res.status(err.statusCode || 400).json({ status: "error", message: "Erro ao tentar ratualizar as informacoes do usuario" });
        }
    }
};
