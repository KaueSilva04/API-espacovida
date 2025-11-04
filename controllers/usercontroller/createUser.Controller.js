const express = require('express');
const UserService = require('../../services/userservices/createUser.Service');
const router = express.Router();

module.exports = {
    async create(req, res) {
        try {
            const { username, password, question, answer, adm } = req.body;       
            const user = await UserService.createUserService(username, password, question, answer, adm);

            res.status(200).json({ 
                status: "ok", 
                message: "Usuário cadastrado com sucesso",
                data: user  
            });
        } catch (err) {
            console.error("Erro ao tentar criar usuario: " + err);
            res.status(err.statusCode || 400).json({ status: "error", message: "Erro ao tentar criar usuario" });
        }
    }
}
