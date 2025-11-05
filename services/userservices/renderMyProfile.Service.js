const userRepository = require("../../repositories/user.repository");
const { verifyToken } = require("../../utils/JWT.JS");

module.exports = {
    async renderMyProfileService(token){
        const decoded = verifyToken(token);
        const id = decoded.id;
        const user = await userRepository.getUserById(id);
        if(!user){
            const err = new Error("Erro interno ao tentar consultar usuario");
            err.statusCode = 500;
            throw err;
        }
        return user;
    }


}