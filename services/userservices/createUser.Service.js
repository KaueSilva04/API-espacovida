const UserRepository = require('../../repositories/user.repository')

module.exports = {
    async createUserService(username, password, question, answer, adm){
        const user = UserRepository.createUser(username, password, question, answer, adm);
        return user;
    }
}