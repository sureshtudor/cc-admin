import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class AuthenticationService {

  @Output() authEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  login(username, password): Observable<string> {
    if (username === 'demo-user' && password === 'demo-password') {
      localStorage.setItem('username', username);
      this.authEvent.emit();
      return Observable.of('success');
    }
    return Observable.of('Invalid username or password!');
  }

  logout() {
    localStorage.removeItem('username');
    this.authEvent.emit();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('username') != null;
  }

  getAuthenticatedUser(): string {
    return localStorage.getItem('username');
  }
}
