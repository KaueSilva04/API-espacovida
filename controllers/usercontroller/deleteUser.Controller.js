// A importação agora é correta, usando a função renomeada (deleteUserService)
const { deleteUserService, CustomError } = require('../../services/userservices/deleteUser.Service');

module.exports = {
    async deleteUser(req, res, next) {
        // Obtém o ID da URL params
        const { id } = req.body;

        try {
            // Validação de presença
            if (!id) {
                return res.status(400).json({
                    status: 'erro',
                    message: 'O ID do usuário é obrigatório para a exclusão.',
                });
            }

            const userId = Number(id);
            
            // Chama a função Service corretamente
            await deleteUserService(userId);

            // Resposta de Sucesso
            return res.status(200).json({
                status: 'ok',
                message: `Usuário com ID ${userId} excluído com sucesso.`,
            });

        } catch (err) {
            // Tratamento de Erros do Service (CustomError)
            // Agora CustomError é a classe correta, resolvendo o 'instanceof'
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