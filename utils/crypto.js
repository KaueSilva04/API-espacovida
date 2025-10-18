const crypto = require('crypto');
require('dotenv').config();




const KEY_ENV = process.env.CRYPTO_KEY;

if (!KEY_ENV) {
    throw new Error('A variável de ambiente CRYPTO_KEY não está definida.');
}
const KEY = Buffer.from(KEY_ENV, 'base64');
const ALGO = 'aes-256-gcm';
const IV_LEN = 12;
const AUTH_TAG_LEN = 16;

function encrypt(plainText) {
    const iv = crypto.randomBytes(IV_LEN);
    const cipher = crypto.createCipheriv(ALGO, KEY, iv, { authTagLength: AUTH_TAG_LEN });
    const encrypted = Buffer.concat([cipher.update(String(plainText), 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return `${iv.toString('base64')}.${authTag.toString('base64')}.${encrypted.toString('base64')}`;
}

function decrypt(token) {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Token de encriptação inválido');
    const iv = Buffer.from(parts[0], 'base64');
    const authTag = Buffer.from(parts[1], 'base64');
    const ciphertext = Buffer.from(parts[2], 'base64');

    const decipher = crypto.createDecipheriv(ALGO, KEY, iv, { authTagLength: AUTH_TAG_LEN });
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return decrypted.toString('utf8');
}


// Exporta todas as funções para serem usadas pelas rotas
module.exports = {
  encrypt,
  decrypt
};