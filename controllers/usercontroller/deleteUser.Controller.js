const UserService = require('../../services/userservices/deleteUser.Service');

module.exports = {
    async deleteUser(req, res, next) {
        try {
            const { id } = req.body;  // ✅ Correto - recebe do body
          
            const user = await UserService.deleteUserService(id);
            
            res.status(200).json({ 
                status: "ok", 
                message: "Usuário deletado com sucesso"
            });
        } catch (err) {
<<<<<<< HEAD
            console.error("Erro ao tentar deletar usuário: " + err);
            res.status(err.statusCode || 400).json({ 
                status: "err", 
                message: "Erro ao tentar deletar usuário" 
            });
=======
            console.error("Erro ao tentar deletar usuario: " + err);
            res.status(err.statusCode || 400).json({ status: "error", message: "Erro ao tentar deletar usuario" });
>>>>>>> a991bfdfe1523e1b046bbc93890fb3ba4c813375
        }
    }
};
