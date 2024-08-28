//Criando uma classes para enviar o email para mim atraves do formulario da pagina

class FormSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);

        if (this.form) {
            this.url = this.form.getAttribute('action'); 
        }

        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
        this.form.innerHTML = this.settings.success; 
    }

    displayError() {
        this.form.innerHTML = this.settings.error;
    }

    // Pegando a mensagem do email
    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");

        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });

        return formObject;
    }

    onSubmission(e) {
        e.preventDefault();
        e.target.disabled = true;
        e.target.innerText = "Enviando...";
    }

    // Fazendo a requisição
    async sendForm(e) {
        try {
            this.onSubmission(e);

            await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(this.getFormObject())
            });

            this.displaySuccess();
        } catch (error) {
            this.displayError();
            console.error(error);
        }
    }

    init() {
        if (this.form) this.formButton.addEventListener("click", this.sendForm);

        return this;
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar a mensagem.</h1>"
});

formSubmit.init();
