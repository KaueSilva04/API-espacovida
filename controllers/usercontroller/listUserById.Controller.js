const { listUserByIdService, CustomError } = require('../../services/userservices/listUserById.Service'); 

module.exports = {
    async listUserById(req, res, next) {
        // Para listar um único recurso, o ID deve vir da URL (req.params), 
        // mas estou usando req.body conforme o seu código de delete para consistência.
        const { id } = req.body; 

        try {
            // Validação de presença do ID
            if (!id) {
                return res.status(400).json({
                    status: 'erro',
                    message: 'O ID do usuário é obrigatório.',
                });
            }
            
            // O Service fará a validação de formato e existência
            const user = await listUserByIdService(id);

            // Resposta de Sucesso (200 OK)
            return res.status(200).json({
                status: 'ok',
                user,
            });

        } catch (err) {
            // Tratamento de Erros: Captura CustomError (400 ou 404 do Service)
            if (err instanceof CustomError) {
                return res.status(err.statusCode).json({
                    status: 'erro',
                    message: err.message,
                });
            }
            
            // Erro genérico (500 Internal Server Error)
            next(err);
        }
    }
};