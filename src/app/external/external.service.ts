import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {DOCUMENT} from "@angular/platform-browser";
import {Observable} from 'rxjs/Rx';

import {BaseService} from "../services/base.service";
import {IAuthAccount, IUserDetails} from "../user/models";
import {IChangePassword, ISecurityProfile, IKeyValuePair} from "./models";
import {environment} from '../../environments/environment';

const EXTERNAL_URI = environment.externalServiceUrl;
const AUTH_ACCOUNT_API = '/auth-account';
const CREATE_USER_API = '/create-user';
const RESET_PWD_API = '/reset-pwd';
const CHANGE_PWD_API = '/change-pwd';
const SECURITY_PROFILE_API = '/security-profile';
const SECURITY_CHALLENGE_API = '/security-challenge';
const HAS_SECURITY_PROFILE_API = '/has-security-profile';

@Injectable()
export class ExternalService extends BaseService {

  constructor(private http: Http,
              @Inject(DOCUMENT) private document: any) {
    super();
  }

  authenticateAccount(model: IAuthAccount): Observable<String> {
    return this.http.post(EXTERNAL_URI + AUTH_ACCOUNT_API, JSON.stringify(model), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  createUser(user: IUserDetails): Observable<string> {
    return this.http.post(EXTERNAL_URI + CREATE_USER_API, JSON.stringify(user), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  resetPassword(recaptcha: string, username: string): Observable<String> {
    let url = this.document.location.href.replace('reset', 'change');
    url = url.replace('#', '%23'); // TODO: use url encoding

    return this.http.get(
      this.appendRequestParams3(EXTERNAL_URI + RESET_PWD_API,
          'recaptcha', recaptcha, 'username', username, 'url', url), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  changePassword(model: IChangePassword): Observable<String> {
    return this.http.post(
      this.appendRequestParam(EXTERNAL_URI + CHANGE_PWD_API, 'recaptcha', model.recaptcha),
          JSON.stringify(model), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  createSecurityProfile(model: ISecurityProfile): Observable<string> {
    return this.http.post(EXTERNAL_URI + SECURITY_PROFILE_API,
          JSON.stringify(model), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  hasSecurityProfile(userid: number): Observable<boolean> {
    return this.http.get(
      this.appendPathVariable(EXTERNAL_URI + HAS_SECURITY_PROFILE_API, userid), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  getChallengeQuestion(userid: number): Observable<IKeyValuePair> {
    return this.http.get(
      this.appendPathVariable(EXTERNAL_URI + SECURITY_CHALLENGE_API, userid), this.getJsonHttpOption())
      .map(res => res.json()).catch(this.handleError);
  }

  validateChallengeAnswer(userid: number, answer: IKeyValuePair): Observable<boolean> {
    return this.http.post(
      this.appendPathVariable(EXTERNAL_URI + SECURITY_CHALLENGE_API, userid),
          JSON.stringify(answer), this.getJsonHttpOption())
      .map(res => res.json()).catch(this.handleError);
  }
}
