import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {IPasswordDetails} from "../user/models";
// import {IChangePassword} from "../pwm/pwm.service";
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
  newpassword2: string
}

@Injectable()
export class PasswordService extends BaseService {

  constructor(private http: Http,
              @Inject(DOCUMENT) private document: any) {
    super();
  }

  getUserPassword(userid: number): Observable<IPasswordDetails> {
    return this.http.get(
      BaseService.appendRequestParam(PASSWORD_URI + CURRENT_PWD_API, 'userid', userid),
      BaseService.getJsonHttpOption())
      .map(res => res.json() as IPasswordDetails).catch(BaseService.handleError);
  }

  extendPasswordExpiry(pwdid: number): Observable<String> {
    return this.http.get(
      BaseService.appendRequestParam(PASSWORD_URI + EXTEND_PWD_API, 'pwdid', pwdid),
      BaseService.getJsonHttpOption())
      .map(res => res.text()).catch(BaseService.handleError);
  }

  resetPassword(userid: number): Observable<String> {
    return this.http.get(
      BaseService.appendRequestParam(PASSWORD_URI + RESET_PWD_API, 'userid', userid),
      BaseService.getJsonHttpOption())
      .map(res => res.text()).catch(BaseService.handleError);
  }

  pwmResetPassword(username: string): Observable<String> {
    let url = this.document.location.href.replace('reset', 'change');
    url = url.replace('#', '%23'); // TODO: use url encoding

    return this.http.get(
      BaseService.appendRequestParams(PASSWORD_URI + PWM_RESET_PWD_API, 'username', username, 'url', url),
      BaseService.getJsonHttpOption())
      .map(res => res.text()).catch(BaseService.handleError);
  }

  pwmChangePassword(model: IChangePassword): Observable<String> {
    return this.http.post(PASSWORD_URI + PWM_CHANGE_PWD_API, JSON.stringify(model),
      BaseService.getJsonHttpOption())
      .map(res => res.text()).catch(BaseService.handleError);
  }
}
