const express = require('express');
const UserService = require('../../services/userservices/createUser.Service');
const router = express.Router();


module.exports = {
    async create(req, res) {
        try {
            const {username, password, question, answer, adm} = req.body;
            const user = UserService.createUserService(username, password, question, answer, adm);
            res.status(200).json({ status: "ok", message: "Usuarios cadastrado com sucesso"})
        } catch (error) {
            console.error("Erro ao tentar chamar rota: " + error);
            res.status(400).json({ status: "err", message: "Erro ao tentar listar usuarios" });
        }
    }
}
 