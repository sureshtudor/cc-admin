import {Observable} from "rxjs/Observable";
import {Headers, RequestOptions} from '@angular/http';

export const AUTHENTICATED_USER = 'AUTHENTICATED_USER';

export interface IAuthenticatedUser {
  token: string,
  username: string,
  fullname: string,
  roles: string[]
}

export abstract class BaseService {

  getJsonHttpOption(): RequestOptions {
    let headers = new Headers({'Content-Type': 'application/json'});
    if (this.isAuthenticated()) {
      headers.append('Authorization', 'Bearer ' + this.getAuthenticatedToken());
    }
    return new RequestOptions({headers: headers});
  }

  handleError(error: Response | any) {
    // hook for enterprise logging maybe?
    return Observable.throw(error);
  }

  appendPathParam(url, id): string {
    return url + "/" + id;
  }

  appendRequestParam(url, param, value): string {
    return url + "?" + param + '=' + value;
  }

  appendRequestParams2(url, param1, value1, param2, value2): string {
    return url + "?" + param1 + '=' + value1 + "&" + param2 + '=' + value2;
  }

  appendRequestParams3(url, param1, value1, param2, value2, param3, value3): string {
    return url + "?" + param1 + '=' + value1 + "&" + param2 + '=' + value2 + "&" + param3 + '=' + value3;
  }

  appendPageParam(url, page, size): string {
    return url + '?page=' + page + '&size=' + size;
  }

  appendSearchParam(url, key, value): string {
    return url + '/search/findBy' + key + '?val=' + value;
  }

  toBoolean(val: string): boolean {
    return val === 'true' ? true : false;
  }

  storeAuthenticatedUser(user: IAuthenticatedUser) {
    localStorage.setItem(AUTHENTICATED_USER, JSON.stringify(user));
  }

  removeAuthenticatedUser() {
    localStorage.removeItem(AUTHENTICATED_USER);
  }

  isAuthenticated(): boolean {
    return this.getAuthenticatedUser() != null;
  }

  getAuthenticatedToken(): string {
    return this.getAuthenticatedUser().token;
  }

  getAuthenticatedFullname(): string {
    return this.getAuthenticatedUser().fullname;
  }

  getAuthenticatedUser(): IAuthenticatedUser {
    return JSON.parse(localStorage.getItem(AUTHENTICATED_USER)) as IAuthenticatedUser;
  }

}
