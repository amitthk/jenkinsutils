import { Component, OnInit } from '@angular/core';
import { AppLoginModel } from 'app/models';
import { Router } from '@angular/router';
import { AuthenticationService, AlertService } from 'app/services';
import { Response } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public message: string;
  public error: string;

  constructor(private router: Router,
    private authenticationService: AuthenticationService, private alertService: AlertService) { }

  public appLoginModel: AppLoginModel;
  public loading: Boolean;
  private returnUrl = '/login';

  ngOnInit() {
    this.appLoginModel = new AppLoginModel();
    this.loading = false;
  }

  submitForm() {
    this.loading = true;
    this.authenticationService.register(this.appLoginModel)
      .subscribe((response: Response) => {
        if (response.status === 200) {
          this.message = response.statusText;
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
}
