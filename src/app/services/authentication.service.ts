import {Http} from "@angular/http";
import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from "rxjs";
import {BaseService, IAuthenticatedUser} from "./base.service";
import {environment} from "../../environments/environment";

const AUTHENTICATION_URI = environment.authenticationUrl;

@Injectable()
export class AuthenticationService extends BaseService {

  @Output() authEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: Http) {
    super();
  }

  login(username, password): Observable<IAuthenticatedUser> {
    let body = JSON.stringify({username: username, password: password});

    return this.http.post(AUTHENTICATION_URI, body)
                    .map(res => res.json() as IAuthenticatedUser)
                    .catch(this.handleError);
  }

  logout() {
    this.removeAuthenticatedUser();
    this.authEvent.emit();
  }

  setAuthenticatedUser(user: IAuthenticatedUser): void {
    this.storeAuthenticatedUser(user);
    this.authEvent.emit();
  }

}
