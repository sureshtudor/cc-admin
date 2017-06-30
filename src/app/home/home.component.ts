import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    a.card-block {
      color: black;
    }
  `],
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
