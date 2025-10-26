const LoginService = require('../../services/userservices/loginUser.Service');

module.exports = {
    async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            const user = await LoginService.loginUserService(username, password);
            // envia cookie HttpOnly
            res.cookie('token', user.token, {
                httpOnly: true,   // não acessível via JS
                secure: process.env.NODE_ENV === 'production', // só HTTPS
                sameSite: 'strict', // protege contra CSRF
                maxAge: 3600000 * 3 // 3 hora
            });
            res.json({ user: user.data });

        } catch (error) {
            console.error('Erro no Controller de Login:', error);
            return res.status(500).json({
                error: 'Ocorreu um erro interno no servidor durante o login.'
            });
        }
    }
};