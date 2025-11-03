const { updateUserService, CustomError } = require('../../services/userservices/updateUser.Service');

module.exports = {
    async updateUser(req, res, next) {
        try {
            const { id, username, question, answer, adm } = req.body;
            const updatedUser = await updateUserService(id, username, question, answer, adm);
            const { password: _, ...userWithoutPassword } = updatedUser;
            res.status(200).json({ status: "ok", message: "Usuario atualizado com sucesso", data: userWithoutPassword });
        } catch (err) {
            console.error("Erro ao tentar atualizar as informacoes do usuario: " + err);
            res.status(err.statusCode || 400).json({ status: "err", message: "Erro ao tentar ratualizar as informacoes do usuario" });
        }
    }
};