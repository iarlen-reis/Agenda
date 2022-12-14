const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        },
    password: {
        type: String,
        required: true,
        }
});



const LoginModel = mongoose.model('usuarios', LoginSchema);


class Login {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    }

    async register() {
        this.valida();

        if(this.erros.length > 0) return;
        
        await this.userExists();

        if(this.erros.length > 0) return;


        // Usando bcryptjs para fazer um hash da senha:
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);

    };

    async login() {
        this.valida();
        if(this.erros.length > 0) return;

        this.user = await LoginModel.findOne({email: this.body.email});

        if(!this.user) {
            this.erros.push('Usuário ou senha inválidos.');
            return;
        };

        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.erros.push('Usuário ou senha inválidos.');
            this.user = null;
            return;
        };

    };

    async userExists() {
        this.user = await LoginModel.findOne({email: this.body.email});
        if(this.user) this.erros.push('Usuário já existe.');

    }   

    valida() {
        this.cleanUp();
        // Validação:

        // Email precisa ser valido:
        if(!validator.isEmail(this.body.email)) {
            this.erros.push('E-mail inválido.');
        };

        // A senha precisa ter entre 3 e 50 caracteres:
        if(this.body.password.length < 3 || this.body.password.length > 50) {
            this.erros.push('A senha precisa ter entre 3 e 50 caracteres.');
        };        
    };

    cleanUp() {
        for(let key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password,
    };
}

}

module.exports = Login;
