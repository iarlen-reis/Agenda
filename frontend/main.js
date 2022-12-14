import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';

import Login from './modules/login';
import contatoCadastro from './modules/cadastrarContato';

const cadastro = new Login('.formCadastro');
const login = new Login('.formLogin');

const contatoCadastramento = new contatoCadastro('.formContatoCadastro');
const contatoEditar = new contatoCadastro('.formEditarContato');


cadastro.init();
login.init();

contatoEditar.init();
contatoCadastramento.init();


