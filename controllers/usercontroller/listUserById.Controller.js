const { listUserByIdService, CustomError } = require('../../services/userservices/listUserById.Service');

module.exports = {
    async listUserById(req, res, next) {
        try {
            const { id } = req.body;
            const user = await listUserByIdService(id);
            res.status(200).json({ status: "ok", message: "Usuario listado com sucesso", data: user })
        } catch (err) {
            console.error("Erro ao tentar listar usuario pelo id: " + err);
            res.status(err.statusCode || 400).json({ status: "err", message: "Erro ao tentar listar usuario" });
        }
    }
};