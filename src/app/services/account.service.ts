import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {IAccountDetails} from '../user/models';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {BaseService} from './base.service';

const ACCOUNT_URI = environment.accountServiceUrl;
const ACCT_EXIST_API = '/exist';
const ACCTS_API = '/accounts';
const USER_ACCT_API = '/user-account';

@Injectable()
export class AccountService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  getAccount(id: number): Observable<IAccountDetails> {
    return this.http.get(
      BaseService.appendPathParam(ACCOUNT_URI + ACCTS_API, id), BaseService.getJsonHttpOption())
      .map(res => res.json() as IAccountDetails).catch(BaseService.handleError);
  }

  getUserAccount(userid: number): Observable<IAccountDetails> {
    return this.http.get(
      BaseService.appendRequestParam(ACCOUNT_URI + USER_ACCT_API, 'userid', userid),
      BaseService.getJsonHttpOption())
      .map(res => res.json() as IAccountDetails).catch(BaseService.handleError);
  }

  isAccountExist(acctnum: number): Observable<boolean> {
    return this.http.get(
      BaseService.appendRequestParam(ACCOUNT_URI + ACCT_EXIST_API, 'acctnum', acctnum),
      BaseService.getJsonHttpOption())
      .map(res => BaseService.toBoolean(res.text())).catch(BaseService.handleError);
  }

}
