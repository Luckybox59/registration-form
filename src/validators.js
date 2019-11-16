export class Validators {
  static required(value) {
    return value && value.trim();
  }

  static validEmail(email) {
    const emailReg = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    return emailReg.test(email);
  } 
}