exports.middlewareGlobal = (req, res, next) => {
    res.locals.erros = req.flash('erros');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.userIsConnected = (req, res, next) => {
    if(req.session.user) {
        req.session.save(() => {
            res.redirect('/');
            return;
        });
    }
    next();
    return;
};

exports.userNotConnected = (req, res, next) => {
    if(req.session.user) {
        next();
        return;
    };
    req.flash('erros', 'Você precisa fazer login para acessar essa página.');
    req.session.save(() => {
        res.redirect('/');
        return;
    });

    return;
};

exports.checkCsrfError = (error, req, res, next) => {
    if(error) {
        return res.render('error404', {
            titulo: 'ERROR 404',
        });
    }
    next();
};  

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}