const UserRepository = require('../../repositories/user.repository')

module.exports = {
    async listAllUsersService(){
        const users = await UserRepository.getAllUsers();
        return users;
    }
}