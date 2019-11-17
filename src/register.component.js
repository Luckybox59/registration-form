import { Validators } from './validators';
import { Form } from "./form";

export class RegisterComponent {
  constructor(id) {
    this.$el = document.getElementById(id);

    this.init();
  }

  init() {
    this.$el.addEventListener('submit', submitHandler.bind(this));
    this.$el.addEventListener('click', helpIcoHandler.bind(this));
    this.form = new Form(this.$el, {
      email: [Validators.required, Validators.validateEmail],
      password: [Validators.required, Validators.minLength(3)],
      confirm: [],
    })
  }
}

function submitHandler(e) {
  e.preventDefault();
  if (this.form.isValid() && this.form.confirmPassword()) {
    const registrationData = {
      email: this.$el.email.value,
      password: this.$el.password.value,
      date: new Date().toLocaleDateString(),
    }
    this.form.clearForm();
    console.log(registrationData);
    setTimeout(() => alert('Регистрация прошла успешно!'), 100);
  }
}

function helpIcoHandler(e) {
  this.$el.querySelectorAll('.help-field').forEach(element => {
    element.classList.add('hide');
  });
  if (e.target.dataset.role === 'help') {
    e.target.nextElementSibling.classList.remove('hide');
  }
}