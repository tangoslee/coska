import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    HttpRequest, HttpHandler,
    HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import 'rxjs/add/operator/do';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // const token = this.tokenService.getAccessToken();

        // req = req.clone({
        //     setHeaders: {
        //         // 'Authorization': `token ${token}`
        //     }
        // });

        // console.log('HttpTokenInterceptor#intercept()', req);
        // return next.handle(req);
        // https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
        // return next.handle(req);
        //     .do(event => {
        //         if (event instanceof HttpResponse) {
        //             // console.log('res!!!', event);
        //         }
        //     }, (err: any) => {
        //         if (err instanceof HttpErrorResponse) {
        //             console.log('err:', err);
        //         }
        //     });
        return next.handle(req);
    }

}

export const HttpTokenProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpTokenInterceptor,
    multi: true
};
