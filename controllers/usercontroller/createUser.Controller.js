const express = require('express');
const UserService = require('../../services/userservices/createUser.Service');
const router = express.Router();

module.exports = {
    async create(req, res) {
        try {
            console.log('=== CREATE USER CONTROLLER ===');
            console.log('Body recebido:', req.body);
            
            const { username, password, question, answer, adm } = req.body;
            
            // ✅ Adicionar validação básica
            if (!username || !password || !question || !answer || adm === undefined) {
                return res.status(400).json({ 
                    status: "err", 
                    message: "Campos obrigatórios faltando" 
                });
            }
            
            const user = await UserService.createUserService(username, password, question, answer, adm);
            
            console.log('Usuário criado:', user);
            
            // ✅ IMPORTANTE: Retornar o usuário criado no 'data'
            res.status(200).json({ 
                status: "ok", 
                message: "Usuário cadastrado com sucesso",
                data: user  // ← ADICIONAR ISSO
            });
        } catch (err) {
<<<<<<< HEAD
            console.error("Erro ao tentar criar usuário: " + err);
            res.status(err.statusCode || 400).json({ 
                status: "err", 
                message: err.message || "Erro ao tentar criar usuário" 
            });
=======
            console.error("Erro ao tentar criar usuario: " + err);
            res.status(err.statusCode || 400).json({ status: "error", message: "Erro ao tentar criar usuario" });
>>>>>>> a991bfdfe1523e1b046bbc93890fb3ba4c813375
        }
    }
}
