import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {IPasswordDetails} from "../user/models";
import {BaseService} from "./base.service";
import {environment} from '../../environments/environment';
import {DOCUMENT} from "@angular/platform-browser";

const PASSWORD_URI = environment.passwordServiceUrl;
const RESET_PWD_API = '/reset-pwd';
const EXTEND_PWD_API = '/extend-pwd';
const CURRENT_PWD_API = '/current-pwd';
const PWM_RESET_PWD_API = '/pwm-reset-pwd';
const PWM_CHANGE_PWD_API = '/pwm-change-pwd';

export interface IChangePassword {
  token: string,
  username: string,
  password: string,
  newpassword1: string,
  newpassword2: string,
  recaptcha: string
}

@Injectable()
export class PasswordService extends BaseService {

  constructor(private http: Http,
              @Inject(DOCUMENT) private document: any) {
    super();
  }

  getUserPassword(userid: number): Observable<IPasswordDetails> {
    return this.http.get(
        this.appendRequestParam(PASSWORD_URI + CURRENT_PWD_API, 'userid', userid),
        this.getJsonHttpOption())
      .map(res => res.json() as IPasswordDetails).catch(this.handleError);
  }

  extendPasswordExpiry(pwdid: number): Observable<String> {
    return this.http.get(
        this.appendRequestParam(PASSWORD_URI + EXTEND_PWD_API, 'pwdid', pwdid),
        this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  resetPassword(userid: number): Observable<String> {
    return this.http.get(
        this.appendRequestParam(PASSWORD_URI + RESET_PWD_API, 'userid', userid),
        this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  pwmResetPassword(recaptcha: string, username: string): Observable<String> {
    let url = this.document.location.href.replace('reset', 'change');
    url = url.replace('#', '%23'); // TODO: use url encoding

    return this.http.get(
        this.appendRequestParams3(PASSWORD_URI + PWM_RESET_PWD_API,
          'recaptcha', recaptcha, 'username', username, 'url', url),
        this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  pwmChangePassword(model: IChangePassword): Observable<String> {
    return this.http.post(
        this.appendRequestParam(PASSWORD_URI + PWM_CHANGE_PWD_API, 'recaptcha', model.recaptcha),
        JSON.stringify(model), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }
}
