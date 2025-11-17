const express = require('express');
const Home = require('../services/home.Service');
const router = express.Router();

module.exports = {
    async listDasboard(req, res) {
        try {
            const result = await Home.homeDataList();
            res.status(200).json({ status: "ok", message: "dados carregados com sucesso" , data: result});
        } catch (err) {
            console.error("Erro ao tentar criar usuario: " + err);
            res.status(err.statusCode || 400).json({ status: "error", message: "Erro ao tentar carregar dados" });
        }
    }
}
