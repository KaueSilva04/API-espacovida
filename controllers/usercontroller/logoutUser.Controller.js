module.exports = {
    async logoutUser(req, res) {
        try {
            res.clearCookie('token');
            res.status(200).json({ status: "ok", message: "Usuario deslogado com sucesso" });
        } catch (err) {
            console.error("Erro ao tentar realizar logout: " + err);
            res.status(err.statusCode || 400).json({ status: "error", message: "Erro ao tentar realizar logout " });
        }
    }
};