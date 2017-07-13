import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {IUser, IUserDetails} from "../user/models";
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {BaseService} from "./base.service";

const USER_SEARCH_URI = environment.userSearchServiceUrl;
const USER_URI = environment.userServiceUrl;
const USERS_API = '/users';
const USER_EXIST_API = '/exist';

@Injectable()
export class UserService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  getUsers(page: number, size: number): Observable<IUser[]> {
    return this.http.get(this.appendPageParam(USER_SEARCH_URI, page, size), this.getJsonHttpOption())
      .map(res => res.json()).catch(this.handleError);
  }

  filterUsers(key: string, value: string): Observable<IUser[]> {
    return this.http.get(this.appendSearchParam(USER_SEARCH_URI, key, value), this.getJsonHttpOption())
      .map(res => res.json()).catch(this.handleError);
  }

  getUser(userid: number): Observable<IUserDetails> {
    return this.http.get(this.appendPathParam(USER_URI + USERS_API, userid), this.getJsonHttpOption())
      .map(res => res.json() as IUserDetails).catch(this.handleError);
  }

  createUser(user: IUserDetails): Observable<string> {
    return this.http.post(USER_URI + USERS_API, JSON.stringify(user), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  updateUser(user: IUserDetails): Observable<string> {
    return this.http.put(
      this.appendPathParam(USER_URI + USERS_API, user.user.userid), JSON.stringify(user),
      this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  deleteUser(userid): Observable<string> {
    return this.http.delete(this.appendPathParam(USER_URI + USERS_API, userid), this.getJsonHttpOption())
      .map(res => res.text()).catch(this.handleError);
  }

  isUsernameExist(username: string): Observable<boolean> {
    return this.http.get(
      this.appendRequestParam(USER_URI + USER_EXIST_API, 'username', username), this.getJsonHttpOption())
      .map(res => this.toBoolean(res.text())).catch(this.handleError);
  }

}
