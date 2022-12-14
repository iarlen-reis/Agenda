const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato', {
        titulo: 'Agenda | Cadastrar contato',
        subtitulo: 'Faça o cadastro do contato abaixo:',
        descricao: 'Preencha os campos para cadastrar um novo contato.',
        botaoDescricao: 'Cadastrar contato',
    });
    return;
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();
    
        if(contato.erros.length > 0) {
            req.flash('erros', contato.erros);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contato cadastrado com sucesso!');
        
        req.session.save(() => {
        res.redirect(`/contato/index/${contato.contato.id}`);
        });
        return;


    } catch(e) {
        console.log(e);
        res.render('error404');
    }
};

exports.editIndex = async (req, res) => {
    if(!req.params.id) {
        res.render('error404');
        return;
    };

    const contato = await Contato.buscaPorId(req.params.id);

    if (!contato) {
        res.render('error404');
        return;
    }
    res.render('contato', {
        titulo: 'Agenda | Editar contato',
        subtitulo: 'Faça a edição de um contato abaixo:',
        descricao: 'Renomei os campos para editar os contatos.',
        botaoDescricao: 'Editar contato',
        contato,
    });
}

exports.edit = async (req, res) => {
    try {
        if(!req.params.id) {
            res.render('error404');
            return;
        };
    
        const contato = new Contato(req.body);
    
        await contato.edit(req.params.id);
        
        if(contato.erros.length > 0) {
            req.flash('erros', contato.erros);
            req.session.save(() => res.redirect('back'));
            return;
        }
    
        req.flash('success', 'Contato editado com sucesso!');
        
        req.session.save(() => {
        res.redirect(`/contato/index/${contato.contato.id}`);
        });
        return;

    } catch(e) {
        console.log(e);
        res.render('error404');
        return;
    };
};

exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('error404');
 
    const contato = await Contato.delete(req.params.id);

    if(!contato) return res.render('404');

    req.session.save(() => {
        req.flash('success', 'Contato deletado com sucesso!');
        res.redirect('/');
        return;
    });
    return;
}