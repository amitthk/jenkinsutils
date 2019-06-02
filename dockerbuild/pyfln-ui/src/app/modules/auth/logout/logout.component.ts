import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    const itm = JSON.parse(token);
    this.authenticationService.logout(itm.emailAddress);
  }

}
