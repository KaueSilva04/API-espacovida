const { PrismaClient } = require('@prisma/client');
const { encrypt, decrypt } = require('../utils/crypto');

const prisma = new PrismaClient();

module.exports = {
    async getAllUsers() {
        const users = await prisma.user.findMany({
            select: { id: true, username: true, adm: true, question: true, answer: true },
        });
        return users;
    }
}