const jwt = require('jsonwebtoken');
const { decodedToken } = require('./JWT.JS');
const SECRET = process.env.JWT_SECRET;

module.exports = {
    authMiddleware(requireAdmin = false) {
        return (req, res, next) => {
            const token = req.cookies.token; // pega token do cookie
            if (!token) return res.status(401).json({ error: 'Token não fornecido', auth: false });

            try {
                const decoded = jwt.verify(token);

                if (requireAdmin && !decoded.adm) {
                    return res.status(403).json({ error: 'Acesso negado', auth: false });
                }

                req.data =  {auth: true, status: "ok", message: "usuario autorizado", decoded};
                next();
            } catch (err) {
                return res.status(403).json({ error: 'Token inválido ou expirado ' + err , auth: false});
            }
        };
    }
}