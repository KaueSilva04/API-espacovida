module.exports = {
    cleanPhone(value) {
        return value.replace(/\D/g, "");
    },
    validatePhone(value) {
        if (!value || typeof value != 'string') {
            throw new Error("Telefone vazio ou não é uma string");
        }
        const cleanead = this.cleanPhone(value);

        const regex = "/^([1-9][1-9])9\d{8}$/";
        if (!regex.test(cleanead)) { }
        return false;
    }
}

    


