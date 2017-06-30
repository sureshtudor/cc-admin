import {Injectable} from "@angular/core";
import {FormGroup} from '@angular/forms';
import {CanDeactivate} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {DialogService} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from "../modal/confirm.component";

export interface FormComponent {
  myForm: FormGroup;
}

@Injectable()
export class UnsavedChangeGuard implements CanDeactivate<FormComponent> {

  constructor(private modal: DialogService) {
  }

  canDeactivate(component: FormComponent): Observable<boolean> | boolean {
    if (component.myForm.dirty) {
      return this.modal.addDialog(ConfirmComponent,
        {title: 'Confirm', message: 'Are you sure you want to navigate away?'})
        .map(res => res as boolean);
    }
    return true;
  }

}
