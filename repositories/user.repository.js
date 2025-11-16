const { prisma } = require('../server');
const { encrypt, decrypt } = require('../utils/crypto');
const { getUserById } = require('../Para ser refatorado/user');

//const prisma = new PrismaClient();

module.exports = {
    async getAllUsers() {
        const users = await prisma.user.findMany({
            select: { id: true, username: true, adm: true, question: true, answer: true },
        });
        return users;
    },
    async createUser(username, password, question, answer, adm) {
        const user = await prisma.user.create({
            data: { username, password, question, answer, adm }
        })
        return user;
    },
    async getUserById(id){
        const user = prisma.user.findUnique({
            where: { id },
            select: { id : true,
                username: true,
                question: true,
                answer: true,
                adm : true
            }
        })
        return user;
    },
    async getUserByName(username){
        const user = prisma.user.findUnique({
            where: { username: username }, // Buscar pelo campo username
            select: { id : true,
                username: true,
                question: true,
                answer: true,
                adm : true,
                password: true // Incluí a senha, pois essa função é tipicamente usada no login
            }
        })
        return user;
    },

    async deleteUser(id){
        const user = await prisma.user.delete({
            where: { id: id }
        })
        return user;
    },
    async updateUser(id,data){
        const user = await prisma.user.update({
            where: { id: id },
            data: data
        })
        return user;
    }

}