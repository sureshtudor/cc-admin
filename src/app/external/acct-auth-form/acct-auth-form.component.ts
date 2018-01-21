import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DialogService} from "ng2-bootstrap-modal";

import {AlertComponent} from "../../shared/modal/alert.component";
import {ConfirmComponent} from "../../shared/modal/confirm.component";
import {ExternalService} from "../external.service";
import {IAuthAccount} from "../../user/models";
import {RecaptchaComponent} from "ng-recaptcha";

@Component({
  selector: 'app-acct-auth-form',
  styles: [`
    .container {
      width: 50%;
      margin-left: 0%;
    }
  `],
  template: `
    <h2>Account Login</h2>
    <br/>
    <div class="container">
      <form [formGroup]="myForm" novalidate (ngSubmit)="onSubmit(myForm.value)">

        <div class="form-group">
          <label>Account Number</label>
          <input type="number" class="form-control" formControlName="acctnum" placeholder="Your Account Number">
          <small [hidden]="!myForm.get('acctnum').touched || myForm.get('acctnum').value > 0" class="text-danger">
            Account number is required.
          </small>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" formControlName="password" placeholder="Your Password">
          <small [hidden]="myForm.controls.password.valid || (myForm.controls.password.pristine)" class="text-danger">
            Invalid Password pattern.
          </small>
        </div>

        <!-- I'm not a robot check -->
        <input type="text" class="form-control" formControlName="recaptcha" hidden>
        <re-captcha #reCaptcha (resolved)="myForm.get('recaptcha').patchValue($event)" 
                   siteKey="6Ldm3SgUAAAAAPJzIUecsl5MZLfYMoa55l0o_ggx">
        </re-captcha>
        <br/>

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
export class AcctAuthFormComponent implements OnInit {

  myForm: FormGroup;
  isLoading: boolean = false;

  @ViewChild('reCaptcha')
  captchaRef: RecaptchaComponent;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modal: DialogService,
              private externalService: ExternalService) {
  }

  ngOnInit() {
    this.isLoading = false;
    this.myForm = this.fb.group({
      acctnum: [3017460, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['TESTACCT', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      recaptcha: ['', Validators.required]
    });
  }

  onSubmit(model: IAuthAccount) {
    this.isLoading = true; // start spinner

    this.externalService.authenticateAccount(model).subscribe(
      data => {
        this.destroy();
        this.router.navigate(['ext/create-user', data]);
      },
      err => {
        this.modal.addDialog(AlertComponent,
          {title: 'Error', message: err.json().message || 'Server Error !'})
          .subscribe(() => this.captchaRef.reset());
        this.isLoading = false;
      }
    );
  }

  onCancel() {
    if (!this.myForm.touched) {
      this.destroy(true);
    }
    else {
      this.modal.addDialog(ConfirmComponent,
        {title: 'Confirm', message: 'Are you sure you want to navigate away?'})
        .subscribe(result => result ? this.destroy(true) : null);
    }
  }

  private destroy(navigateBack: boolean = false) {
    this.isLoading = false; // stop spinner
    this.myForm.markAsPristine();
    if (navigateBack) {
      this.router.navigate(['']);
    }
  }

}
