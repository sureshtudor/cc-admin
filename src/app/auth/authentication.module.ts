import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {AuthenticationComponent} from "./authentication.component";
import {AuthenticationService} from "../services/authentication.service";
import {SharedModule} from "../shared/shared.module";

export const ROUTES: Routes = [
  {path: 'login', component: AuthenticationComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    AuthenticationComponent
  ],
  providers: [
    AuthenticationService
  ],
  exports: [
    AuthenticationComponent
  ],
})
export class AuthenticationModule {
}
