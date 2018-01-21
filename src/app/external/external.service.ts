import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {DOCUMENT} from "@angular/platform-browser";
import {Observable} from 'rxjs/Rx';

import {BaseService} from "./base.service";
import {IUserDetails} from "../user/models";
import {IChangePassword, ISecurityQnA} from "../external/models";
import {environment} from '../../environments/environment';

const EXTERNAL_URI = environment.externalServiceUrl;
const CREATE_USER_API = '/create-user';
const RESET_PWD_API = '/reset-pwd';
const CHANGE_PWD_API = '/change-pwd';
const SECURITY_QUESTIONS_API = '/security-questions';

@Injectable()
export class ExternalService extends BaseService {

  constructor(private http: Http,
              @Inject(DOCUMENT) private document: any) {
    super();
  }

  createUser(user: IUserDetails): Observable<string> {
    return this.http.post(EXTERNAL_URI + CREATE_USER_API, JSON.stringify(user), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  pwmResetPassword(recaptcha: string, username: string): Observable<String> {
    let url = this.document.location.href.replace('reset', 'change');
    url = url.replace('#', '%23'); // TODO: use url encoding

    return this.http.get(
      this.appendRequestParams3(EXTERNAL_URI + RESET_PWD_API,
          'recaptcha', recaptcha, 'username', username, 'url', url), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  pwmChangePassword(model: IChangePassword): Observable<String> {
    return this.http.post(
      this.appendRequestParam(EXTERNAL_URI + CHANGE_PWD_API, 'recaptcha', model.recaptcha),
          JSON.stringify(model), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  setupSecretQuestions(model: ISecurityQnA): Observable<string> {
    return this.http.post(EXTERNAL_URI + SECURITY_QUESTIONS_API,
          JSON.stringify(model), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

}
