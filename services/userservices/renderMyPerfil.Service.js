const userRepository = require("../../repositories/user.repository");
const { verifyToken } = require("../../utils/JWT.JS");

module.exports = {
    async renderMyPerfilService(token){
        const decoded = verifyToken(token);
        console.log(decoded);
        const id = decoded.id;
        console.log(id);      
        const user = await userRepository.getUserById(id);
        console.log(user)
        if(!user){
            const err = new Error("Erro interno ao tentar realizar login");
            err.statusCode = 500;
            throw err;
        }
        return user;
    }


}