const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


module.exports = {
    async hashPassword(password) {
        if (!password) throw new Error("A senha é obrigatória.");
        const hashed = await bcrypt.hash(password, SALT_ROUNDS);
        return hashed;
    },

    async comparePassword(password, hashedPassword) {
        if (!password || !hashedPassword) throw new Error("Ambos os valores são obrigatórios.");
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    }

};
