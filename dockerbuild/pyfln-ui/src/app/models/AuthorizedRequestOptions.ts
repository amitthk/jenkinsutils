import { BaseRequestOptions } from '@angular/http';
import { timingSafeEqual } from 'crypto';

export class AuthorizedRequestOptions extends BaseRequestOptions {
    token: any;
    constructor(customOptions?: any) {
        super();
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        this.token = authToken && authToken.token;
        if ( this.token) {
            this.headers.append('Authorization', this.token);
         }
    }
}
