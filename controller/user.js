const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { encrypt, decrypt } = require('./hash');
const crypto = require('crypto');
// --- FUNÇÕES DE CRUD PARA USUÁRIO ---
const prisma = new PrismaClient();

async function getAllUsers() {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, username: true, adm: true, question: true, answer: true },
        });
        return users;
    } catch (error) {
        console.error("Erro ao buscar todos os usuários:", error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
}


async function createUser({ username, password, question, answer, adm }) {
    const hashedPassword = encrypt(password);
    try {
        const newUser = await prisma.user.create({
            data: { username, password: hashedPassword, question, answer, adm: adm === true },
        });
        const { password: _, ...userToReturn } = newUser;
        return userToReturn;
    } catch (error) {
        if (error?.code === 'P2002') {
            const err = new Error('Este nome de usuário já está em uso.');
            err.code = 'USERNAME_TAKEN';
            throw err;
        }
        throw error;
    }
}


async function getAllUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            question: true,
            answer: true,
            adm: true
        }
    });
    return users;
}

async function getUserById(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            question: true,
            answer: true,
            adm: true
        }
    });
    return user;
}

async function getUserByUsername(username) {
    const user = await prisma.user.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            question: true,
            answer: true,
            adm: true
        }
    });

    // CORREÇÃO CRÍTICA: Adicionar a instrução return
    return user;
}
async function updateUser(userId, updateData) {
    // Se uma nova senha for fornecida, criptografa ela antes de salvar
    if (updateData.password) {
        updateData.password = encrypt(updateData.password);
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });
        const { password: _, ...userToReturn } = updatedUser;
        return userToReturn;
    } catch (error) {
        // Erro do Prisma para "registro não encontrado para atualizar"
        if (error?.code === 'P2025') {
            const err = new Error('Usuário não encontrado.');
            err.code = 'USER_NOT_FOUND';
            throw err;
        }
        // Erro do Prisma para "campo único duplicado" (caso mude o username)
        if (error?.code === 'P2002') {
            const err = new Error('Este nome de usuário já está em uso.');
            err.code = 'USERNAME_TAKEN';
            throw err;
        }
        throw error;
    }
}


async function deleteUser(userId) {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });
        const { password: _, ...userToReturn } = deletedUser;
        return userToReturn;
    } catch (error) {
        // Erro do Prisma para "registro não encontrado para deletar"
        if (error?.code === 'P2025') {
            const err = new Error('Usuário não encontrado para deletar.');
            err.code = 'USER_NOT_FOUND';
            throw err;
        }
        throw error;
    }
}

// Exporta todas as funções para serem usadas pelas rotas
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser
};