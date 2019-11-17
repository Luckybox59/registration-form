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
    const invalidPasswords = new Set(JSON.parse(window.invalidPasswords));
    clearControlError($password);
    if (invalidPasswords.has($password.value)) {
      showControlError($password, 'Такой пароль не подходит, смотрите справку!');
    } else if ($password.value !== $confirm.value) {
      showControlError($password, 'Пароли не совпадают!');
      showControlError($confirm, 'Пароли не совпадают!');
    }
    return !invalidPasswords.has($password.value) && $password.value === $confirm.value;
  }

  isValid() {

    let isValidForm = true;

    Object.keys(this.controls).forEach(k => {
      const validators = this.controls[k];
      const $control = this.form[k];
      clearControlError($control);

      let isValidControl = true;

      validators.forEach(validator => {
          isValidControl = isValidControl && validator($control.value);
      });

      if (!isValidControl) {
        showControlError($control, 'Введите корректоное значение, для спарвки нажмите знак вопроса!');
      }

      isValidForm = isValidForm && isValidControl;
    });

    return isValidForm;
  }

}

function showControlError($control, message) {
  $control.classList.add('error');
  const errMessageHtml = `<p><small class="control-error">${message}</small></p>`;
  $control.closest('.form-control').insertAdjacentHTML('beforeend', errMessageHtml);
}

function clearControlError($control) {
  $control.classList.remove('error');
  const $controlError = $control.closest('.form-control').querySelector('.control-error');
  if ($controlError) {
    $controlError.remove();
  }
}