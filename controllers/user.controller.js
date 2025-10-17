const express = require('express');
const UserService = require('../services/user.service');
const router = express.Router();



module.exports = {
    async listAll(req, res) {
        try {
            const users = UserService.listAllUsersService();
            res.status(200).json({ status: "ok", message: "Usuarios encontrados com sucesso", data: users });

        } catch (error) {
            console.error("Erro ao tentar chamar rota: " + error);
            res.status(400).json({ status: "err", message: "Erro ao tentar listar usuarios" });
        }
    }
}
