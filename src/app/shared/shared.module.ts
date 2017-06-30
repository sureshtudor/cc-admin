import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';

import {ConfirmComponent} from './modal/confirm.component';
import {AlertComponent} from './modal/alert.component';
import {PromptComponent} from './modal/prompt.component';
import {SpinnerComponent} from "./spinner.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BootstrapModalModule,
    BootstrapModalModule.forRoot({container: document.body})
  ],
  declarations: [
    AlertComponent,
    ConfirmComponent,
    PromptComponent,
    SpinnerComponent
  ],
  entryComponents: [
    AlertComponent,
    ConfirmComponent,
    PromptComponent
  ],
  exports: [
    AlertComponent,
    ConfirmComponent,
    PromptComponent,
    SpinnerComponent
  ],
  providers: []
})
export class SharedModule {
}
