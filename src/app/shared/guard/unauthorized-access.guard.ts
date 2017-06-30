import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {DialogService} from "ng2-bootstrap-modal";
import {AlertComponent} from "../modal/alert.component";
import {AuthenticationService} from "../../services/authentication.service";

@Injectable()
export class UnAuthorizedAccessGuard implements CanActivate {

  constructor(private service: AuthenticationService,
              private modal: DialogService) {
  }

  canActivate() {
    if (!this.service.isAuthenticated()) {
      this.modal.addDialog(AlertComponent,
        {title: 'Unauthorized Access', message: 'Please login to access this resource.'},
        {closeByClickingOutside: true});
      return false;
    }
    return true;
  }
}
