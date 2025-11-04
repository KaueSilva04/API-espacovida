const { resetPasswordService } = require("../../services/userservices/resetPassword.Service");

module.exports = {
    async resetPasswordUser(req, res){
        try{
            const {username, password, answer} = req.body;
            const user = await resetPasswordService(username, password, answer);
            res.status(200).json({ status: "ok", message: "Usuario atualizado com sucesso"});
        }catch(err){
             console.error("Erro ao tentar atualizar a senha usuario: " + err);
            res.status(err.statusCode || 400).json({ status: "error", message: "Erro ao tentar atualizar a senha usuario" });
        }
        
    }
}