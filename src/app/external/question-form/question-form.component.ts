import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";

import {ConfirmComponent} from "../../shared/modal/confirm.component";
import {AlertComponent} from "../../shared/modal/alert.component";
import {ExternalService} from "../external.service";
import {environment} from '../../../environments/environment';
import {RecaptchaComponent} from "ng-recaptcha";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  myForm: FormGroup;
  isTokenUrl: boolean;
  isLoading: boolean = false;

  @ViewChild('reCaptcha')
  captchaRef: RecaptchaComponent;

  QUESTION_GROUP1 = environment.SecretQuestions_1;
  QUESTION_GROUP2 = environment.SecretQuestions_2;
  QUESTION_GROUP3 = environment.SecretQuestions_3;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private modal: DialogService,
              private externalService: ExternalService) {
  }

  ngOnInit() {
    // capture 'token' param.
    let param = this.route.snapshot.params['id'];
    this.isTokenUrl = param ? true : false;

    this.myForm = this.fb.group({
      token: param,
      recaptcha: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      question1: 0,
      answer1: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      question2: 0,
      answer2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      question3: 0,
      answer3: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

  onSubmit(model) {
    this.isLoading = true; // start spinner

    this.externalService.createSecurityProfile(model).subscribe(
      data => {
        this.modal.addDialog(AlertComponent,
          {title: 'Success', message: data}, {closeByClickingOutside: true}).subscribe(
          () => this.exitPage());
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

  private getSecurityQuestion(id: number): string {
    let arrays = this.QUESTION_GROUP1.concat(this.QUESTION_GROUP2).concat(this.QUESTION_GROUP3);
    return arrays.filter (x => x.value == id)[0].name;
  }

}
