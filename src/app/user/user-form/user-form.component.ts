import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogService} from 'ng2-bootstrap-modal';
import {AlertComponent} from "../../shared/modal/alert.component";
import {ConfirmComponent} from "../../shared/modal/confirm.component";
import {UserService} from "../../services/user.service";
import {PasswordService} from "../../services/password.service";
import {AccountService} from "../../services/account.service";
import {IUserDetails, IAccountDetails, IPasswordDetails, AccountStatus, PasswordStatus} from "../models";
import {environment} from '../../../environments/environment';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styles: [`
    .btn-group {
      padding-bottom: 5px;
    }
  `],
})
export class UserFormComponent implements OnInit {

  myForm: FormGroup;
  title: string;
  isEdit: boolean;
  isLoading: boolean = false;
  isAcctnumExist: boolean = true;
  isUsernameExist: boolean = false;
  acctDetails: IAccountDetails;
  pwdDetails: IPasswordDetails;

  ACCT_STATUS = AccountStatus;
  PWD_STATUS = PasswordStatus;
  LOS_NAMES = environment.LOSNames;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private location: Location,
              private modal: DialogService,
              private userService: UserService,
              private pwdService: PasswordService,
              private acctService: AccountService) {
    this.resetAccountDetails();
    this.resetPasswordDetails();
    // bind form group
    this.myForm = this.fb.group({
      acctnum: 3017460, // null,
      losid: 0,
      comment: '',
      user: this.fb.group({
          userid: 0,
          active: true,
          lockedout: false,
          username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
          firstname: ['', Validators.required],
          lastname: ['', Validators.required],
          email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
        }
      )
    });
  }

  ngOnInit() {
    var userid = Number(this.route.snapshot.params['id']);
    this.isEdit = userid ? true : false;
    this.title = userid ? "Edit User" : "Add User";

    if (userid) {
      this.userService.getUser(userid).subscribe(
        data => {
          this.myForm.setValue(data, {onlySelf: true})
          this.loadAccountDetails(data.acctnum);
        },
        err => this.rxErrorHandle(err)
      );
      this.loadPasswordDetails(userid);
    }
  }

  onAccountNumberChange(acctnum: number) {
    if (acctnum) {
      this.loadAccountDetails(acctnum);
    }
  }

  onUsernameChange(username: string) {
    if (username && !this.isEdit) {
      // check if username already exist?
      this.userService.isUsernameExist(username).subscribe(
        data => this.isUsernameExist = data,
        err => this.rxErrorHandle(err)
      );
    }
  }

  onSubmit(model: IUserDetails) {
    this.isLoading = true;

    if (model.user.userid > 0) {  // update user
      this.userService.updateUser(model).subscribe(
        data => this.rxSuccessHandler(data, true),
        err => this.rxErrorHandle(err)
      );
    }
    else {  // create user
      this.userService.createUser(model).subscribe(
        data => this.rxSuccessHandler(data, true),
        err => this.rxErrorHandle(err)
      );
    }
  }

  onResetPassword(userid: number) {
    let disposable = this.modal.addDialog(ConfirmComponent, {
      title: 'Confirm',
      message: "Are you sure you want to reset your password ?"
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.isLoading = true;
          this.pwdService.resetPassword(userid).subscribe(
            data => {
              this.rxSuccessHandler(data);
              this.loadPasswordDetails(userid);
            },
            err => this.rxErrorHandle(err)
          );
        }
      });
  }

  onExtendPassword(userid: number, passwordid: number) {
    let disposable = this.modal.addDialog(ConfirmComponent, {
      title: 'Confirm',
      message: "Are you sure you want to extend your password expiry?"
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.isLoading = true;
          this.pwdService.extendPasswordExpiry(passwordid).subscribe(
            data => {
              this.rxSuccessHandler(data);
              this.loadPasswordDetails(userid);
            },
            err => this.rxErrorHandle(err)
          );
        }
      });
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

  private loadAccountDetails(acctnum: number) {
    this.acctService.getAccount(acctnum).subscribe(
      data => {
        this.acctDetails = data;
        this.isAcctnumExist = true;
      },
      err => {
        this.resetAccountDetails();
        this.isAcctnumExist = false;
      }
    );
  }

  private loadPasswordDetails(userid: number) {
    this.pwdService.getUserPassword(userid).subscribe(
      data => this.pwdDetails = data,
      err => this.rxErrorHandle(err)
    );
  }

  private rxSuccessHandler(data: any, isExit: boolean = false) {
    this.modal.addDialog(AlertComponent, {
      title: 'Success',
      message: data
    }, {closeByClickingOutside: true});

    this.isLoading = false;
    if (isExit) this.exitPage();
  }

  private rxErrorHandle(err: any) {
    this.modal.addDialog(AlertComponent, {
      title: 'Error', message: JSON.parse(err.text()).message
    }, {closeByClickingOutside: true});

    this.isLoading = false;
  }

  private exitPage() {
    this.myForm.markAsPristine();
    this.location.back();
  }

  private resetAccountDetails() {
    this.acctDetails = {
      acctnum: 0,
      acctname: '',
      custname: '',
      acctstatus: 0
    };
  }

  private resetPasswordDetails() {
    this.pwdDetails = {
      pwdid: 0,
      type: 0,
      expiry: ''
    };
  }
}
