import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {IAccountDetails} from '../user/models';
import {Observable} from 'rxjs/Rx';
import {BaseService} from './base.service';
import {environment} from '../../environments/environment';

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
      this.appendPathParam(ACCOUNT_URI + ACCTS_API, id), this.getJsonHttpOption())
      .map(res => res.json() as IAccountDetails).catch(this.handleError);
  }

  getUserAccount(userid: number): Observable<IAccountDetails> {
    return this.http.get(
      this.appendRequestParam(ACCOUNT_URI + USER_ACCT_API, 'userid', userid),
        this.getJsonHttpOption())
      .map(res => res.json() as IAccountDetails).catch(this.handleError);
  }

  isAccountExist(acctnum: number): Observable<boolean> {
    return this.http.get(
      this.appendRequestParam(ACCOUNT_URI + ACCT_EXIST_API, 'acctnum', acctnum),
        this.getJsonHttpOption())
      .map(res => this.toBoolean(res.text())).catch(this.handleError);
  }

}
