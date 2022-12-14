/* 
Modelo Express + MongoDB + Handlebars:
    - Helmet esta desativado no desenvolvimento.
*/

// Importando path, otenv e helmet:
const path = require('path');
// const helmet = require('helmet'); DESATIVADO
require('dotenv').config();

// Importando express e mongoose:
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Importando session, flash e mongoStore:
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

// Importando as rotas do arquivo routes.js, middleware e CRS:
const routes = require('./routes');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');


// Configurando mongoose com a dotenv:
mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://iarlenreis:brasil22@cursojs01.ulvnj9i.mongodb.net/AGENDA?retryWrites=true&w=majority')
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => console.log(e));

// Configurando pasta de arquivos estaticos e helmet:
// app.use(helmet()); DESATIVADO
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')));

// Configurando session e criando colletions da session no banco de dados:
const sessionOptions = session({
    secret: 'sou secreto',
    store: MongoStore.create({mongoUrl: 'mongodb+srv://iarlenreis:brasil22@cursojs01.ulvnj9i.mongodb.net/AGENDA?retryWrites=true&w=majority'}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

// Handlebars configuração:
const exphbs = require('express-handlebars');
const handlebars = exphbs.create({});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'src', 'views'));

// Setando as rotas do arquivo routes.js, configurando o middlewares global e CRS:
app.use(csrf());
app.use(middlewareGlobal);
app.use(csrfMiddleware);
app.use(checkCsrfError);
app.use(routes);

const port = process.env.PORT || 3000;

// Configurando a porta do express:
app.on('pronto', () => {
    app.listen(port, () => {
        console.log('http://localhost:3000');
        console.log('SERVIDOR EXECUTANDO NA PORTA 3000!');
    });
});

