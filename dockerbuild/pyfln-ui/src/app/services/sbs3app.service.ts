import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../../app/app.settings';
import { S3LoginModel, BucketInfoModel, BucketDetailsModel } from '../models/index';
import { environment } from '../../environments/environment';
import { AuthorizedRequestOptions } from '../models/index';

@Injectable()
export class Sbs3appService implements OnInit {
  private apiUrl: string;

  constructor(private http: Http) {
    this.apiUrl =  '/api/'; // AppSettings.envEndpoints.get(environment.env) ;
  }

  ngOnInit() {

  }

  postS3bucketRequest(loginInfo: S3LoginModel): Observable<string> {
    return this.http.post(this.apiUrl + 's3/updatecredentials',
    loginInfo, this.getOptions()).map((response: Response) => response.text());
  }

  getS3bucketObjectRequest(bucketName: String): Observable<string[]> {
    return this.http.get(this.apiUrl + 'list?bucketName=' + bucketName,
    this.getOptions()).map((response: Response) => response.json());
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
