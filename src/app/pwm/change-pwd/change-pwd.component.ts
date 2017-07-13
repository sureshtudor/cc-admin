import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";

import {AlertComponent} from "../../shared/modal/alert.component";
import {ConfirmComponent} from "../../shared/modal/confirm.component";
import {PasswordValidator} from "./password-validator";
import {IChangePassword, ExternalService} from "../../services/external.service";

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html'
})
export class ChangePwdComponent implements OnInit {

  myForm: FormGroup;
  isTokenUrl: boolean;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private modal: DialogService,
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

    this.externalService.pwmChangePassword(model).subscribe(
      data => {
        this.modal.addDialog(AlertComponent,
          {title: 'Success', message: data}, {closeByClickingOutside: true});
        this.exitPage();
      },
      err => {
        this.isLoading = false; // stop spinner
        this.modal.addDialog(AlertComponent,
          {title: 'Error', message: err.json().message || 'Server Error !'},
          {closeByClickingOutside: true})
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
