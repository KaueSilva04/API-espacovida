const { getUserByNameService, CustomError } = require('../../services/userservices/listUserByName.Service');

module.exports = {
    async listUserByName(req, res, next) {
        try {
            const {username} = req.body;
            const user = await getUserByNameService(username);
            const { password,answer ,...userWithoutPassword } = user;
            res.status(200).json({ status: "ok", message: "Usuario listado com sucesso", data: userWithoutPassword });
        } catch (err) {
            console.error("Erro ao tentar listar usuario pelo username: " + err);
            res.status(err.statusCode || 400).json({ status: "error", message: "Erro ao tentar listar usuario" });
        }
    }
};