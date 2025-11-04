const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET; // 🔒 Defina no .env

module.exports = {
    generateToken(payload) {
        // payload = dados que você quer incluir (ex: id, email)
        return jwt.sign(payload, SECRET, { expiresIn: '3h' });
    },

    verifyToken(token) {
        try {
            if (!token) {
                const err = new Error("Token invalido");
                err.statusCode = 500;
                throw err;
            }
            return jwt.verify(token, SECRET); // retorna o payload se for válido
        } catch (error) {
            return null; // token inválido ou expirado
        }
    },
    decodedToken(token) {
        try {
            const decoded = jwt.verify(token, SECRET);
            return decoded;
        } catch {
            return null;
        }
    }
};
