const UserRepository = require('../repositories/user.repository')

module.exports = {
    async listAllUsersService(){
        const users = UserRepository.getAllUsers();
        return users;
    }
}