const UserRepository = require('../../repositories/user.repository');
const crypto = require('../../utils/crypto');
const { generateToken } = require('../../utils/JWT.JS');


module.exports = {
    async loginUserService(username, password) {

         if (!username || !password) throw new Error('Username ou password são obrigatorios');
        

        const user = await UserRepository.getUserByName(username);
        if (!user) throw new Error('usuario inesistente.');

        const payload = {
            id: user.id,
            email: user.email,
            adm: user.adm
        }

        const match = crypto.comparePassword(password, user.password);
        if (!match) throw new Error("senha invalida!!");

        const token = generateToken(payload);

        return { token: token, data: { id: user.id, email: user.email, role: user.role } };

    }
};