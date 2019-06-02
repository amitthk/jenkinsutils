import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isLoggedIn(): Boolean {
    if (localStorage.getItem('authToken')) {
      return true;
    } else {
      return false;
    }
  }

}
