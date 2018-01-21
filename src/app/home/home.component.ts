import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .card-block {
      color: black;
      text-decoration: none;
    }
    .card:focus,
    .card:hover {
      box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
    }
  `],
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
