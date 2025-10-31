const { updateUserService, CustomError } = require('../../services/userservices/updateUser.Service');

module.exports = {
    async updateUser(req, res, next) {




        try {
            const { id, username, password, question, answer, adm } = req.body;
            const updatedUser = await updateUserService(id, username, password, question, answer, adm);
            const { password: _, ...userWithoutPassword } = updatedUser;
            res.status(200).json({ status: "ok", message: "Usuario atualizado com sucesso", data: userWithoutPassword });
        } catch (err) {
            console.error("Erro ao tentar deletar usuario: " + err);
            res.status(err.statusCode || 400).json({ status: "err", message: "Erro ao tentar realizar login" });
        }
    }
};