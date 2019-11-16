export class Form {
  constructor(form, controls) {
    this.form = form;
    this.controls = controls;
  }

  clearForm() {
    Object.keys(this.controls).forEach(k => {
      this.form[k].value = '';
    })
  }

  confirmPassword() {
    const $password = this.form.password;
    const $confirm = this.form.confirm;
    const invalidPasswords = new Set(['123', 'password', 'qwerty']);
    clearControl($password);
    if (invalidPasswords.has($password.value)) {
      showErrorMessage($password, 'Такой пароль не подходит, смотрите справку!');
    } else if ($password.value !== $confirm.value) {
      showErrorMessage($password, 'Пароли не совпадают!');
      showErrorMessage($confirm, 'Пароли не совпадают!');
    }
    return !invalidPasswords.has($password.value) && $password.value === $confirm.value;
  }

  isValid() {

    let isValidForm = true;

    Object.keys(this.controls).forEach(k => {
      const validators = this.controls[k];
      const $control = this.form[k];
      clearControl($control);

      let isValidControl = true;

      validators.forEach(validator => {
          isValidControl = isValidControl && validator($control.value);
      });

      if (!isValidControl) {
        showErrorMessage($control, 'Введите корректоное значение, для спарвки нажмите знак вопроса!');
      }

      isValidForm = isValidForm && isValidControl;
    });

    return isValidForm;
  }

}

function showErrorMessage($control, message) {
  $control.classList.add('warn-border');
  const errMessageHtml = `<p><small class="control-error">${message}</small></p>`;
  $control.closest('.form-control').insertAdjacentHTML('beforeend', errMessageHtml);
}

function clearControl($control) {
  $control.classList.remove('warn-border');
  const $controlError = $control.closest('.form-control').querySelector('.control-error');
  if ($controlError) {
    $controlError.remove();
  }
}