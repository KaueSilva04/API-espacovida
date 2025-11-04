const UserService = require('../../services/userservices/deleteUser.Service');

module.exports = {
    async deleteUser(req, res, next) {
        try {
            const { id } = req.body;
            const user = await UserService.deleteUserService(id);   
            res.status(200).json({ status: "ok", message: "Usuário deletado com sucesso"});
        } catch (err) {
            console.error("Erro ao tentar deletar usuario: " + err);
            res.status(err.statusCode || 400).json({ status: "error", message: "Erro ao tentar deletar usuario" });
        }
    }
};
