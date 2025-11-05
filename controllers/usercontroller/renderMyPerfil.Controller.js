const renderPerfil = require('../../services/userservices/renderMyPerfil.Service')

module.exports = {
    async renderMyPerfil(req, res){
        try{
            const token = req.cookies.token;
            const user = await renderPerfil.renderMyPerfilService(token);
               const { answer, ...userWithoutanswer } = user;
            res.status(200).json({ status: "ok", message: "informacões do usuario consultadas com sucesso", user: userWithoutanswer });
        }catch(err){
            console.error("Erro ao tentar carregar informacoes do usuario: " + err);
            res.status(err.statusCode || 400).json({ status: "error", message: "Erro ao tentar carregar informacões do usuario " });
        }
    }

}