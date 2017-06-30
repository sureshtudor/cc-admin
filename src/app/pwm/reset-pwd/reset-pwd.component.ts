import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DialogService} from "ng2-bootstrap-modal";

import {AlertComponent} from "../../shared/modal/alert.component";
import {ConfirmComponent} from "../../shared/modal/confirm.component";
import {PasswordService} from "../../services/password.service";

@Component({
  selector: 'app-reset-pwd',
  styles: [`
    .container {
      width: 50%;
      margin-left: 0%;
    }
  `],
  template: `
    <h2>Reset Password</h2>
    <br/>
    <div class="container">
      <form [formGroup]="myForm" novalidate (ngSubmit)="onSubmit(myForm.value)">
        <div class="form-group">
          <label>Username</label>
          <input type="text" class="form-control" formControlName="username" placeholder="Your Username">
          <small [hidden]="!myForm.controls.username.touched || myForm.controls.username.valid"
                 class="text-danger">
            Username must contain at least 3 characters.
          </small>
        </div>
        <button type="submit" class="btn btn-default btn-primary" [disabled]="myForm.invalid">
          Submit
        </button>
        &nbsp;&nbsp;&nbsp;
        <button type="button" class="btn btn-default btn-primary" (click)="onCancel()">
          Cancel
        </button>
        <spinner [visible]="isLoading"></spinner>
      </form>
    </div>
  `
})
export class ResetPwdComponent implements OnInit {

  myForm: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modal: DialogService,
              private pwdService: PasswordService) {
  }

  ngOnInit() {
    this.isLoading = false;
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }

  onSubmit(model) {
    this.isLoading = true; // start spinner

    this.pwdService.pwmResetPassword(model.username).subscribe(
      data => {
        this.modal.addDialog(AlertComponent,
          {title: 'Success', message: data}, {closeByClickingOutside: true});
        this.exitPage();
      },
      err => {
        this.isLoading = false // stop spinner
        this.modal.addDialog(AlertComponent,
          {title: 'Error', message: JSON.parse(err.text()).message}, {closeByClickingOutside: true})
      }
    );
  }

  onCancel() {
    if (!this.myForm.touched) {
      this.exitPage();
    }
    else {
      this.modal.addDialog(ConfirmComponent,
        {title: 'Confirm', message: 'Are you sure you want to navigate away?'})
        .subscribe(result => result ? this.exitPage() : null);
    }
  }

  private exitPage() {
    this.myForm.markAsPristine();
    this.router.navigate(['']);
  }
}
