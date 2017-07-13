import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from "ng2-recaptcha";
import {UiSwitchModule} from 'angular2-ui-switch';
import {Ng2PaginationModule} from 'ng2-pagination';
import {SharedModule} from '../shared/shared.module';

import {UsersComponent} from './users/users.component';
import {UserFormComponent} from './user-form/user-form.component';
import {ExtUserFormComponent} from './ext-user-form/ext-user-form.component';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';

import {UnAuthorizedAccessGuard} from '../shared/guard/unauthorized-access.guard';
import {UnsavedChangeGuard} from '../shared/guard/unsaved-change.guard';
import {AccountService} from "../services/account.service";
import {PasswordService} from "../services/password.service";
import {ExternalService} from "../services/external.service";

export const ROUTES: Routes = [
  {path: 'users/new', component: ExtUserFormComponent, canDeactivate: [UnsavedChangeGuard]},
  {path: 'users/add', component: UserFormComponent, canDeactivate: [UnsavedChangeGuard]},
  {path: 'users/:id', component: UserFormComponent, canDeactivate: [UnsavedChangeGuard]},
  {path: 'users', component: UsersComponent, canActivate: [UnAuthorizedAccessGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RouterModule.forChild(ROUTES),
    UiSwitchModule,
    Ng2PaginationModule,
    SharedModule
  ],
  declarations: [
    UsersComponent,
    UserFormComponent,
    ExtUserFormComponent
  ],
  exports: [
    UsersComponent
  ],
  providers: [
    UserService,
    AccountService,
    PasswordService,
    ExternalService,
    AuthenticationService,
    UnAuthorizedAccessGuard,
    UnsavedChangeGuard
  ]
})
export class UserModule {
}
