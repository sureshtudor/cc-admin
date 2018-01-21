import {Component} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';

export interface AlertModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-alert',
  template: `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{title || 'Alert'}}</h4>
          <button type="button" class="close" aria-label="Close" (click)="close()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div [innerHtml]="message"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" (click)="close()">OK</button>
        </div>
      </div>
    </div>`
})
export class AlertComponent extends DialogComponent<AlertModel, null> implements AlertModel {

  title: string;
  message: string;

  constructor(dialogService: DialogService) {
    super(dialogService);
    this.message = 'No message!';
  }
}
