const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    res.render('login', {
        titulo: 'Agenda | login & Cadastro',
    });
};

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if(login.erros.length > 0) {
            req.flash('erros', login.erros);
            req.session.save(function () {
            return res.redirect('back'); 
        });
        return;
        }
        req.flash('success', 'Seu usuário foi criado com sucesso!');
        req.session.save(function () {
        return res.redirect('back'); 
        });
    }
    catch (error) {
        res.render('error404');
    };


    return;
};

exports.login = async (req, res) => {

    try {
        const login = new Login(req.body);
        await login.login();

        if(login.erros.length > 0) {
            req.flash('erros', login.erros);

            req.session.save(function () {
            return res.redirect('back'); 
        });
        return;
        };

        req.flash('success', 'Login feito com sucesso!');
        req.session.user = login.user;
        req.session.save(function () {
        return res.redirect('/'); 
        });
    }
    catch (error) {
        res.render('error404');
    };
    return;
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
    return;
}
