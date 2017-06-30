import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService} from 'ng2-bootstrap-modal';

import {AuthenticationService} from "../services/authentication.service";
import {ConfirmComponent} from "../shared/modal/confirm.component";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styles: [`
    .container {
      width: 50%;
      margin-left: 0%;
    }
  `],
})
export class AuthenticationComponent implements OnInit {

  myForm: FormGroup;
  errorMsg: string;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private modal: DialogService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['demo-user', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['demo-password', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  onSubmit(model) {
    this.isLoading = true;

    this.authService.login(model.username, model.password).subscribe(
      data => {
        if (data === 'success') {
          this.myForm.markAsPristine();
          this.router.navigate(['users']);
        }
        else {
          this.errorMsg = data;
        }
      },
      err => {
        this.errorMsg = 'Exception: ' + err.value;
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
