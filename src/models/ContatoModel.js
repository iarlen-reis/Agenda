const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    sobrenome: {
        type: String,
        default: '',
    },
    telefone: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
    criadoEm: {
        type: Date,
        default: Date.now(),
    }
});

const ContatoModel = mongoose.model('contatos', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.erros = [];
    this.contato = null;
}

Contato.buscaPorId = async function(id) {
    if(typeof id !== 'string') return;

    const user = await ContatoModel.findById(id).lean();

    return user;
};

Contato.prototype.register = async function() {
    this.valida();

    if(this.erros.length > 0) return;

    

    this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function() {
    this.cleanUp();
    // Validação:

    // Email precisa ser valido:
    if(this.body.email && !validator.isEmail(this.body.email)) {
        this.erros.push('E-mail inválido.');
    };
    
    if(!this.body.nome) this.erros.push('Nome é um campo obrigatório');
    
    if(!this.body.email && !this.body.telefone) this.erros.push('É necessário um email ou telefone.');

};

Contato.prototype.cleanUp = function() {
    for(let key in this.body) {
        if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }
    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        telefone: this.body.telefone,
        email: this.body.email.toLowerCase(),
};
}

Contato.prototype.edit = async function(id) {
    if(typeof id !== 'string') return;

    this.valida();

    if(this.erros.length > 0) return;

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
        new: true
    });
};

Contato.buscarContatos = async function() {
    const contatos = await ContatoModel.find().lean().sort({ criadoEm: -1 });
    return contatos;

};

Contato.delete = async function(id) {
    const contato = await ContatoModel.findByIdAndDelete({_id: id});
    return contato;
};


module.exports = Contato;