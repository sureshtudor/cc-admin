import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {IUserDetails} from "../user/models";
import {BaseService} from "./base.service";
import {DOCUMENT} from "@angular/platform-browser";
import {environment} from '../../environments/environment';

const EXTERNAL_URI = environment.externalServiceUrl;
const USERS_API = '/users';
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
export class ExternalService extends BaseService {

  constructor(private http: Http,
              @Inject(DOCUMENT) private document: any) {
    super();
  }

  createUser(user: IUserDetails): Observable<string> {
    return this.http.post(EXTERNAL_URI + USERS_API, JSON.stringify(user), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  pwmResetPassword(recaptcha: string, username: string): Observable<String> {
    let url = this.document.location.href.replace('reset', 'change');
    url = url.replace('#', '%23'); // TODO: use url encoding

    return this.http.get(
      this.appendRequestParams3(EXTERNAL_URI + PWM_RESET_PWD_API,
        'recaptcha', recaptcha, 'username', username, 'url', url), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  pwmChangePassword(model: IChangePassword): Observable<String> {
    return this.http.post(
      this.appendRequestParam(EXTERNAL_URI + PWM_CHANGE_PWD_API, 'recaptcha', model.recaptcha),
      JSON.stringify(model), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

}
