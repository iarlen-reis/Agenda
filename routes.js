const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const {userIsConnected, userNotConnected} = require('./src/middlewares/middleware');
const contatoController = require('./src/controllers/contatoController');

// Rotas das home:
route.get('/', homeController.index);

// Rotas  de login:
route.get('/login',userIsConnected, loginController.index);
route.post('/login/login', loginController.login);
// Rota de cadastro:
route.post('/login/register', loginController.register);
// Rota de logout:
route.get('/logout', loginController.logout);
// Rota de cadastrar contato:
route.get('/contato/index',userNotConnected, contatoController.index);
route.post('/contato/index',userNotConnected, contatoController.register);
// Rota de editar contato:
route.get('/contato/index/:id',userNotConnected, contatoController.editIndex);
route.post('/contato/edit/:id',userNotConnected, contatoController.edit);
// Rota de deletar contato:
route.get('/contato/delete/:id',userNotConnected, contatoController.delete);
module.exports = route;
