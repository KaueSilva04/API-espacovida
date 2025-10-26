const { updateUserService, CustomError } = require('../../services/userservices/updateUser.Service');

module.exports = {
    async updateUser(req, res, next) {
        // Obtém o ID da URL params
        const { id } = req.body; 
        
        // Obtém os dados a serem atualizados (username, password, question, answer, adm)
        // Usamos 'req.body' para todos, esperando que os campos não fornecidos sejam undefined.
        const { username, password, question, answer, adm } = req.body; 

        try {
            // Validação de presença do ID
            if (!id) {
                return res.status(400).json({
                    status: 'erro',
                    message: 'O ID do usuário é obrigatório para a atualização.',
                });
            }
            
            // Conversão e validação de formato do ID
            const userId = Number(id);
            if (isNaN(userId) || userId <= 0) {
                return res.status(400).json({
                    status: 'erro',
                    message: 'ID inválido. O ID do usuário deve ser um número positivo.',
                });
            }
            
            // Validação: É necessário pelo menos um campo para atualizar
            if (!username && !password && question === undefined && answer === undefined && adm === undefined) {
                return res.status(400).json({
                    status: 'erro',
                    message: 'Nenhum campo de atualização fornecido.',
                });
            }

            // Chama o Service
            const updatedUser = await updateUserService(
                userId,
                username, 
                password, 
                question, 
                answer, 
                adm 
            );

            // Remove a senha do objeto antes de enviar a resposta
            const { password: _, ...userWithoutPassword } = updatedUser;

            // Resposta de Sucesso
            return res.status(200).json({
                status: 'ok',
                message: `Usuário com ID ${userId} atualizado com sucesso.`,
                user: userWithoutPassword,
            });

        } catch (err) {
            // Tratamento de Erros: Captura CustomError
            if (err instanceof CustomError) {
                return res.status(err.statusCode).json({
                    status: 'erro',
                    message: err.message,
                });
            }
            
            // Erro genérico
            next(err);
        }
    }
};