import {AbstractControl} from '@angular/forms';

export class PasswordValidator {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('newpassword1').value;
    let confirmPassword = AC.get('newpassword2').value;

    if (password != confirmPassword) {
      AC.get('newpassword2').setErrors({MatchPassword: true})
    }
    return null
  }
}
