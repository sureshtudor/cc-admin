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
    return this.http.get(BaseService.appendPageParam(USER_SEARCH_URI, page, size))
      .map(res => res.json()).catch(BaseService.handleError);
  }

  filterUsers(key: string, value: string): Observable<IUser[]> {
    return this.http.get(BaseService.appendSearchParam(USER_SEARCH_URI, key, value))
      .map(res => res.json()).catch(BaseService.handleError);
  }

  getUser(userid: number): Observable<IUserDetails> {
    return this.http.get(
      BaseService.appendPathParam(USER_URI + USERS_API, userid), BaseService.getJsonHttpOption())
      .map(res => res.json() as IUserDetails).catch(BaseService.handleError);
  }

  createUser(user: IUserDetails): Observable<string> {
    return this.http.post(USER_URI + USERS_API, JSON.stringify(user), BaseService.getJsonHttpOption())
      .map(res => res.text()).catch(BaseService.handleError);
  }

  updateUser(user: IUserDetails): Observable<string> {
    return this.http.put(
      BaseService.appendPathParam(USER_URI + USERS_API, user.user.userid), JSON.stringify(user),
      BaseService.getJsonHttpOption())
      .map(res => res.text()).catch(BaseService.handleError);
  }

  deleteUser(userid): Observable<string> {
    return this.http.delete(
      BaseService.appendPathParam(USER_URI + USERS_API, userid),
      BaseService.getJsonHttpOption())
      .map(res => res.text()).catch(BaseService.handleError);
  }

  isUsernameExist(username: string): Observable<boolean> {
    return this.http.get(
      BaseService.appendRequestParam(USER_URI + USER_EXIST_API, 'username', username),
      BaseService.getJsonHttpOption())
      .map(res => BaseService.toBoolean(res.text())).catch(BaseService.handleError);
  }

}
