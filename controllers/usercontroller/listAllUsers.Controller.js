const UserService = require('../../services/userservices/listAllUsers.Service');

module.exports = {
    async listAll(req, res) {
        try {
            const users = await UserService.listAllUsersService();
            res.status(200).json({ status: "ok", message: "Usuarios listados com sucesso", data: users });

        } catch (error) {
            console.error("Erro ao tentar listar usuarios: " + error);
            res.status(400).json({ status: "error", message: "Erro ao tentar listar usuarios" });
        }
    }
}
