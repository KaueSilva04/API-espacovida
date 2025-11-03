const UserRepository = require('../../repositories/user.repository');
const crypto = require('../../utils/crypto');
const { generateToken } = require('../../utils/JWT.JS');


module.exports = {
    async loginUserService(username, password) {

        if (!username || typeof username !== 'string' || !password || typeof password !== 'string') {
            const err = new Error("Insira username e password como um string obrigatoriamente");
            err.statusCode = 400;
            throw err;
        }

        const user = await UserRepository.getUserByName(username);

        if (!user) {
            const err = new Error("Erro interno ao tentar realizar login");
            err.statusCode = 500;
            throw err;
        }

        const payload = {
            id: user.id,
            email: user.email,
            adm: user.adm
        }

        const match = await crypto.comparePassword(password, user.password);
     
        if (!match) {
            
            const err = new Error("Senha invalida!");
            err.statusCode = 400;
            throw err;
        }
           

        const token = generateToken(payload);

        return { token: token, data: { id: user.id, email: user.email, adm: user.adm } };

    }
};