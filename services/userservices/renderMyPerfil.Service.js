const userRepository = require("../../repositories/user.repository");
const { decodedToken } = require("../../utils/JWT.JS");

module.exports = {
    renderMyPerfilService(token){
        const decoded = decodedToken(token);
        const id = decoded.data.decoded.id;
        
    }


}