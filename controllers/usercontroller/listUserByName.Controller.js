const { getUserByNameService, CustomError } = require('../../services/userservices/listUserByName.Service');

module.exports = {
    async listUserByName(req, res, next) {
        try {
            const username = req.body.username;
            const user = await getUserByNameService(username);
            const { password, ...userWithoutPassword } = user;
            res.status(200).json({ status: "ok", message: "Usuario listado com sucesso", data: userWithoutPassword });
        } catch (err) {
            console.error("Erro ao tentar deletar usuario: " + err);
            res.status(err.statusCode || 400).json({ status: "err", message: "Erro ao tentar listar usuario" });
        }
    }
};