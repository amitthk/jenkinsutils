import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './index';
import { User } from '../models/user';

@Injectable()
export class ProjectService {

    private apiUrl: string;

    constructor(
        private http: Http) {
        this.apiUrl = '/api';
    }

    getProjectHome(): Observable<User[]> {

        // get users from api
        return this.http.get(this.apiUrl + '/home', this.jwt())
            .map((response: Response) => response.json());
    }

    private jwt() {
        // create authorization header with jwt token
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        if (authToken && authToken.token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + authToken.token });
            return new RequestOptions({ headers: headers });
        }
    }
}