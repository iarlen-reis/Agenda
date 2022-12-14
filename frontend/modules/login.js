const valitador = require('validator');


export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);

    }

    init() {
        this.events(this.form);

    }

    events(form) {
        if(!form) return;

        form.addEventListener('submit', (event) => {
            const elemento = event;

            elemento.preventDefault();
            this.validate(elemento);
        });

    }

    validate(elemento) {
        let error = false;
        const el = elemento.target;

        const inputEmail = el.querySelector('input[name="email"]');
        const inputPassword = el.querySelector('input[name="password"]');

        if(!valitador.isEmail(inputEmail.value)) {
            this.criaErro(inputEmail, 'E-mail inválido');
            error = true;
            return;
        };
        if(inputPassword.value < 3 || inputPassword.value > 50) {
            this.criaErro(inputPassword, 'A senha precisa ter entre 3 e 50 caracteres.');
            error = true;
            return;
        }

        el.submit();
    }

    criaErro(campo, mensagem) {
        for(let errorText of document.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        const div = document.createElement('div');
        div.innerHTML = mensagem;
        div.classList.add('error-text');

        campo.insertAdjacentElement('afterend', div); 
    }
};