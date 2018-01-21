import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";
import {ExternalService} from "../external.service";
import {IChangePassword} from "../models";

import {AlertComponent} from "../../shared/modal/alert.component";
import {ConfirmComponent} from "../../shared/modal/confirm.component";
import {PasswordValidator} from "./password-validator";
import {RecaptchaComponent} from "ng-recaptcha";

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html'
})
export class ChangePwdComponent implements OnInit {

  myForm: FormGroup;
  isTokenUrl: boolean;
  isLoading: boolean = false;

  @ViewChild('reCaptcha')
  captchaRef: RecaptchaComponent;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private dialogService: DialogService,
              private externalService: ExternalService) {
  }

  ngOnInit() {
    // capture 'token' param.
    let param = this.route.snapshot.queryParams["token"];
    this.isTokenUrl = param ? true : false;
    const passwordRegex = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@*#!$^]).{8,20}$';

    this.myForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        newpassword1: ['', [Validators.required, Validators.pattern(passwordRegex)]],
        newpassword2: ['', Validators.required],
        recaptcha: ['', Validators.required],
        token: param
      },
      {
        validator: PasswordValidator.MatchPassword
      }
    );
  }

  onSubmit(model: IChangePassword) {
    this.isLoading = true; // start spinner

    this.externalService.changePassword(model).subscribe(
      data => {
        let msg = "Your password has been changed successfully."
          .concat(data ? "<br>Please create your security profile" : "");

        this.dialogService.addDialog(AlertComponent,
          {title: 'Success', message: msg}, {closeByClickingOutside: true})
          .subscribe(() => {
            // configure security profile if not exist?
            if (data) {
              this.exitPage();
              this.router.navigate(['ext/security-questions', data]);
            }
            else {
              this.exitPage(true);
            }
          });
      },
      err => {
        this.dialogService.addDialog(AlertComponent,
          {title: 'Error', message: err.json().message || 'Server Error !'})
          .subscribe(() => { this.captchaRef.reset() });
        this.isLoading = false; // stop spinner
      }
    );
  }

  onCancel() {
    if (!this.myForm.touched) {
      this.exitPage(true);
    }
    else {
      this.dialogService.addDialog(ConfirmComponent,
        {title: 'Confirm', message: 'Are you sure you want to navigate away?'})
        .subscribe(result => result ? this.exitPage(true) : null);
    }
  }

  private exitPage(navigateBack: boolean = false) {
    this.isLoading = false;
    this.myForm.markAsPristine();
    if (navigateBack) {
      this.router.navigate(['']);
    }
  }

}
