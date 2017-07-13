import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-toggleable-md navbar-inverse bg-primary">
      <a href="#" class="navbar-brand">
        <img src="../../assets/images/logo.png" height="36">
      </a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link clickable" routerLink="">Home</a>
        </li>
        <li *ngIf="isAuthenticated" class="nav-item" >
          <a class="nav-link clickable" routerLink="users">Users</a>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <span class="navbar-text">{{authenticatedUser}}</span>
        </li>
        <li class="nav-item">
          <a class="nav-link clickable" routerLink="login" (click)="loginOrOut()">
            {{isAuthenticated ? 'Logout' : 'Login'}}</a>
        </li>
      </ul>
    </nav>
  `
})
export class NavbarComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  authenticatedUser: string;

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.refresh();
    this.authService.authEvent.subscribe(x => this.refresh());
  }

  ngOnDestroy(): void {
    this.authService.authEvent.unsubscribe();
  }

  loginOrOut() {
    if (this.isAuthenticated) {
      this.authService.logout();
      this.router.navigate(['/']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  private refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authenticatedUser = this.isAuthenticated ? this.authService.getAuthenticatedFullname() : '';
  }
}
