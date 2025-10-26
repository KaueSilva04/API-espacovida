
exports.module = {
    authMiddleware(requireAdmin = false) {
    return (req, res, next) => {
        const token = req.cookies.token; // pega token do cookie
        if (!token) return res.status(401).json({ error: 'Token não fornecido' });

        try {
            const decoded = jwt.verify(token, SECRET);

            if (requireAdmin && !decoded.adm) {
                return res.status(403).json({ error: 'Acesso negado' });
            }

            req.user = decoded;
            next();
        } catch (err) {
            return res.status(403).json({ error: 'Token inválido ou expirado' });
        }
    };
}
}