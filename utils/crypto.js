const bcrypt = require('bcrypt');
const PASSWORD_SALT_ROUNDS = 10;
const SALT_ROUNDS = 4;


module.exports = {
    async hash(text) {
        if (!text) throw new Error("A senha é obrigatória.");
        const hashed = await bcrypt.hash(text, SALT_ROUNDS);
        return hashed;
    },

    async compare(text, hashedText) {
        if (!text || !hashedText) throw new Error("Ambos os valores são obrigatórios.");
        const match = await bcrypt.compare(text, hashedText);
        return match;
    },
     async hashPassword(password) {
        if (!password) throw new Error("A senha é obrigatória.");
        const hashed = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
        return hashed;
    },

    async comparePassword(password, hashedPassword) {
        if (!password || !hashedPassword) throw new Error("Ambos os valores são obrigatórios.");
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    }


};
