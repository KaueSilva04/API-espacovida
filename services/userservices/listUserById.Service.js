const UserRepository = require('../../repositories/user.repository');


module.exports ={
    async listUserByIdService(id){
        if (!id || id >= 0) {
            const err = new Error("id não informado ou valor negativo");
            err.statusCode = 400;
            throw err;
        }

        const user = UserRepository.getUserById(id);

        if (!user) {
            const err = new Error("Erro interno ao tentar listar Usuario");
            err.statusCode = 500;
            throw err;
        }
        return user;
    }
}