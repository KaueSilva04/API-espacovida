const LoginService = require('../../services/userservices/loginUser.Service');

module.exports = {
    async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            const user = await LoginService.loginUserService(username, password);
            
            res.cookie('token', user.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000 * 3
            });
            res.status(200).json({ status: "ok", message: "Usuario logado com sucesso", data: user.data });

        } catch (err) {
            console.error("Erro ao tentar realizar login: " + err);
            res.status(err.statusCode || 400).json({ status: "error", message: "Erro ao tentar realizar login " });
        }
    }
};