const { updateUserService, CustomError } = require('../../services/userservices/updateUser.Service');

module.exports = {
    async updateUser(req, res, next) {
        try {
            console.log('=== UPDATE USER CONTROLLER ===');
            console.log('Body recebido:', req.body);
            
            const { id, username, question, answer, adm } = req.body;
            
            // ✅ Validar se id existe
            if (!id) {
                return res.status(400).json({ 
                    status: "err", 
                    message: "ID do usuário não informado" 
                });
            }
            
            console.log('Chamando service com:', { id, username, question, answer, adm });
            
            const updatedUser = await updateUserService(id, username, question, answer, adm);
            
            console.log('Usuário atualizado:', updatedUser);
            
            // ✅ Remove a senha da resposta
            const { password: _, ...userWithoutPassword } = updatedUser;
            
            res.status(200).json({ 
                status: "ok", 
                message: "Usuário atualizado com sucesso", 
                data: userWithoutPassword 
            });
        } catch (err) {
<<<<<<< HEAD
            console.error("Erro ao tentar atualizar usuário: " + err);
            res.status(err.statusCode || 400).json({ 
                status: "err", 
                message: err.message || "Erro ao tentar atualizar as informações do usuário" 
            });
=======
            console.error("Erro ao tentar atualizar as informacoes do usuario: " + err);
            res.status(err.statusCode || 400).json({ status: "error", message: "Erro ao tentar ratualizar as informacoes do usuario" });
>>>>>>> a991bfdfe1523e1b046bbc93890fb3ba4c813375
        }
    }
};
