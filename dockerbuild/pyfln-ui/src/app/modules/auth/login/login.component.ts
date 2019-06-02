import { Component, OnInit } from '@angular/core';
import { AppLoginModel } from 'app/models';
import { Router } from '@angular/router';
import { AuthenticationService, AlertService } from 'app/services';
import { Response } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error: string;
  public message: string;

  constructor(private router: Router,
    private authenticationService: AuthenticationService, private alertService: AlertService) { }

  public appLoginModel: AppLoginModel;
  public loading: Boolean;
  private returnUrl = '/index';

  ngOnInit() {
    this.appLoginModel = new AppLoginModel();
    this.loading = false;
  }

  submitForm() {
    this.loading = true;
    this.authenticationService.login(this.appLoginModel)
    .subscribe((response: Response) => {
      if (response.status === 200) {
        this.extractTokenAndSetAuthHeader(this.appLoginModel.emailAddress, response);
        this.router.navigate([this.returnUrl]);
      } else {
        this.error = response.statusText;
        console.error(response.statusText);
        this.loading = false;

      }
    },
    (error) => {
      this.error = error;
      this.loading = false;
    });
  }
  extractTokenAndSetAuthHeader(emailAddress: string, response: Response) {
    if (response.headers.has('Authorization')) {
      const token = response.headers.get('Authorization');
      this.setToken(emailAddress, token);
      console.log('Your auth token for this session is : ' + token);
      return true;
    } else {
      this.removeToken(emailAddress);
      return false;
    }
  }
  removeToken(emailAddress: string): any {
    localStorage.removeItem('authToken');
  }
  setToken(emailAddress: string, token: any): any {
    localStorage.setItem('authToken', JSON.stringify({emailAddress: emailAddress, token: token}));
  }



}
