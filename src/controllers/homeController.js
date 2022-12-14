const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {

    const contatos = await Contato.buscarContatos();

    res.render('index', {
        titulo: 'Pagina inicial',
        contatos

    })
};