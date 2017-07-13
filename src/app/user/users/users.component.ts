import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DialogService} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from "../../shared/modal/confirm.component";
import {AlertComponent} from "../../shared/modal/alert.component";

import {IUser} from '../models';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [`
    div.tablewrapper {
      height: 600px;
      overflow-y: hidden;
    }
  `],
})
export class UsersComponent implements OnInit {

  users: IUser[];
  // onSearch
  filterKey: string;
  filterBy: string = 'Username';
  filters = ['Username', 'Email', 'Firstname', 'Lastname'];
  // pagination.
  page_size: number = 10;
  current_page: number = 1;
  total_elements: number = 0;
  hide_page_widget: boolean = false;

  constructor(private router: Router,
              private modal: DialogService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.loadPagedData();
  }

  onRowSelected(id: number) {
    this.router.navigate(['users', id]);
  }

  onSearch() {
    if (this.filterKey) {
      this.userService.filterUsers(this.filterBy, this.filterKey).subscribe(
        data => this.rxHandleData(data),
        err => this.rxHandleError(err));
      // onSearch result is not paginated.
      this.hide_page_widget = true;
    }
    else {
      this.loadPagedData();
    }
  }

  onDelete(user) {
    let disposable = this.modal.addDialog(ConfirmComponent, {
      title: 'Delete User',
      message: "Are you sure you want to Delete '" + user.username + "' ?"
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.userService.deleteUser(user.userid).subscribe(
            data => {
              this.modal.addDialog(AlertComponent,
                {title: 'Success', message: data}, {closeByClickingOutside: true});
              this.users = this.users.filter((x) => x.userid !== user.userid);
            },
            err => this.rxHandleError(err)
          );
        }
      });
  }

  // called by pagination widget.
  onPageChanged(page) {
    this.current_page = page;
    this.loadPagedData();
  }

  pageLabel() {
    return String(this.current_page);
  }

  private loadPagedData() {
    this.hide_page_widget = false;
    this.userService.getUsers(this.current_page - 1, this.page_size).subscribe(
      data => this.rxHandleData(data)),
      err => this.rxHandleError(err)
  }

  private rxHandleData(data: any) {
    this.users = data.content as IUser[];
    this.total_elements = data.page ? data.page.totalElements : this.users.length;
  }

  private rxHandleError(err: any) {
    err => this.modal.addDialog(AlertComponent,
      {title: 'Error', message: err.json().message || 'Server Error !'},
      {closeByClickingOutside: true})
  }

}
