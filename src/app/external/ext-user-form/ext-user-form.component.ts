import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogService} from 'ng2-bootstrap-modal';
import {AlertComponent} from "../../shared/modal/alert.component";
import {ExternalService} from "../external.service";
import {IUserDetails} from "../../user/models";
import {ConfirmComponent} from "../../shared/modal/confirm.component";
import {environment} from '../../../environments/environment';

@Component({
  selector: 'ext-user-form',
  templateUrl: './ext-user-form.component.html',
  styles: [`
    .container {
      width: 50%;
      margin-left: 0%;
    }
  `],

})
export class ExtUserFormComponent implements OnInit {

  myForm: FormGroup;
  isLoading: boolean = false;
  LOS_NAMES;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private modal: DialogService,
              private externalService: ExternalService,) {
    this.LOS_NAMES = environment.LOSNames;
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      token: this.route.snapshot.params['id'],
      acctnum: 0, //3017460,
      losid: 0,
      comment: '',
      recaptcha: ['', Validators.required],
      user: this.fb.group({
          userid: 0,
          username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
          firstname: ['', Validators.required],
          lastname: ['', Validators.required],
          email: ['', [Validators.required, Validators.pattern('[a-z0-9.@]*')]],
        }
      )
    });
  }

  onSubmit(model: IUserDetails) {
    this.isLoading = true;
    this.externalService.createUser(model).subscribe(
      data => {
        this.modal.addDialog(AlertComponent,
          {title: 'Success', message: 'User created successfully.<br>Please fill-out security questionnaire.'},
          {closeByClickingOutside: true});
        this.destroy();
        this.router.navigate(['ext/security-questions', data]);
      },
      err => {
        this.modal.addDialog(AlertComponent,
          {title: 'Error', message: err.json().message || 'Server Error !'},
          {closeByClickingOutside: true});
        this.destroy(true);
      }
    )
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
    this.isLoading = false;
    this.myForm.markAsPristine();

    if (navigateBack) {
      this.router.navigate(['']);
    }
  }

}
