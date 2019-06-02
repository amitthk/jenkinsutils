import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AlertService } from './alert.service';
import 'rxjs/add/operator/map';
import { AppLoginModel, AuthorizedRequestOptions } from 'app/models';

@Injectable()
export class AuthenticationService {
    public token: string;
    public apiUrl: string;
    constructor(private http: Http, private alertService: AlertService) {
        // set token if saved in local storage
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        this.token = authToken && authToken.token;
        this.apiUrl = '/api/auth';
    }

    login(appLoginModel: AppLoginModel): Observable<Response> {
        const opts = this.getOptions();
        return this.http.post(this.apiUrl + '/login', appLoginModel, opts)
            .map((response: Response) => {
                return response;
            });
    }

    register(appLoginModel: AppLoginModel): Observable<Response> {
        const opts = this.getOptions();
        return this.http.post(this.apiUrl + '/register', appLoginModel, opts)
            .map((response: Response) => {
                return response;
            });
    }

    logout(emailAddress: string): void {
        const opts = this.getOptions();
        // clear token remove user from local storage to log user out
        this.http.post(this.apiUrl + '/logout', null, opts).map((resp: Response) => {
           this.token = null;
        });
        localStorage.removeItem('authToken');
    }

    private getOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if ( options == null) {
          options = new AuthorizedRequestOptions();
        }
        if ( options.headers == null) {
          options.headers = new Headers({ 'Content-Type': 'application/json'});
        }
        return options;
      }
}
