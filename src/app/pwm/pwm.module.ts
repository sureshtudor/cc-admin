import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from "../shared/shared.module";
import {ResetPwdComponent} from "./reset-pwd/reset-pwd.component";
import {ChangePwdComponent} from "./change-pwd/change-pwd.component";
import {UnsavedChangeGuard} from "../shared/guard/unsaved-change.guard";
import {PasswordService} from "../services/password.service";

export const ROUTES: Routes = [
  {path: 'pwm/reset', component: ResetPwdComponent, canDeactivate: [UnsavedChangeGuard]},
  {path: 'pwm/change', component: ChangePwdComponent, canDeactivate: [UnsavedChangeGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ResetPwdComponent,
    ChangePwdComponent
  ],
  exports: [],
  providers: [
    PasswordService
  ]
})
export class PasswordManagerModule {
}