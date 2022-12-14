import validator from "validator";


export default class contatoCadastro {
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
        })
    }

    validate(elemento) {
        let error = false;

        const el = elemento.target;
        const nomeinput = el.querySelector('input[name="nome"]');
        const sobrenomeInput = el.querySelector('input[name="sobrenome"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');
        const emailInput = el.querySelector('input[name="email"]');


        if(!nomeinput.value) {
            this.criaErro(nomeinput, 'O nome é obrigatório');
            error = true; 
            return;
        }
        if(!telefoneInput.value && !emailInput.value) {
            this.criaErro(telefoneInput, 'É necessário ao menos o telefone ou e-mail do contato');
            error = true; 
            return;
        }
        if(emailInput.value) {

            const valido = validator.isEmail(emailInput.value)

            if(!valido) {
                error = true; 
                this.criaErro(emailInput, 'E-mail inválido.');
                return;
            }
        }

        if(error) return;

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
}