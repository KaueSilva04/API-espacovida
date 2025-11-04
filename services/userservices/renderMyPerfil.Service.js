const userRepository = require("../../repositories/user.repository");
const { verifyToken } = require("../../utils/JWT.JS");

module.exports = {
    renderMyPerfilService(token){
        const decoded = verifyToken(token);
        const id = decoded.data.decoded.id;
        if(!id){

    
        
    }


}