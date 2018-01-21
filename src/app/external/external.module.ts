import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {RecaptchaModule} from "ng-recaptcha";
import {SharedModule} from "../shared/shared.module";
import {ResetPwdComponent} from "./reset-pwd/reset-pwd.component";
import {ChangePwdComponent} from "./change-pwd/change-pwd.component";
import {ExtUserFormComponent} from './ext-user-form/ext-user-form.component';
import {UnsavedChangeGuard} from "../shared/guard/unsaved-change.guard";
import {ExternalService} from "./external.service";
import {QuestionFormComponent} from './question-form/question-form.component';
import { AcctAuthFormComponent } from './acct-auth-form/acct-auth-form.component';

export const ROUTES: Routes = [
  {path: 'ext/reset-pwd', component: ResetPwdComponent, canDeactivate: [UnsavedChangeGuard]},
  {path: 'ext/change-pwd', component: ChangePwdComponent, canDeactivate: [UnsavedChangeGuard]},
  {path: 'ext/create-user', component: AcctAuthFormComponent, canDeactivate: [UnsavedChangeGuard]},
  {path: 'ext/create-user/:id', component: ExtUserFormComponent, canDeactivate: [UnsavedChangeGuard]},
  {path: 'ext/security-questions', component: QuestionFormComponent, canDeactivate: [UnsavedChangeGuard]},
  {path: 'ext/security-questions/:id', component: QuestionFormComponent, canDeactivate: [UnsavedChangeGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ResetPwdComponent,
    ChangePwdComponent,
    ExtUserFormComponent,
    QuestionFormComponent,
    AcctAuthFormComponent
  ],
  exports: [],
  providers: [
    ExternalService
  ]
})
export class ExternalModule {
}
