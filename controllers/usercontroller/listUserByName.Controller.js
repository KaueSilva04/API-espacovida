const { getUserByNameService, CustomError } = require('../../services/userservices/listUserByName.Service'); 

module.exports = {
    async listUserByName(req, res, next) {
        const username = req.body.username || req.query.username;

        try {
            if (!username) {
                return res.status(400).json({
                    status: 'erro',
                    message: 'O nome de usuário é obrigatório para a busca.',
                });
            }
            
            const user = await getUserByNameService(username);
            
            const { password, ...userWithoutPassword } = user;

            return res.status(200).json({
                status: 'ok',
                user: userWithoutPassword,
            });

        } catch (err) {
            if (err instanceof CustomError) {
                return res.status(err.statusCode).json({
                    status: 'erro',
                    message: err.message,
                });
            }
            
            next(err);
        }
    }
};