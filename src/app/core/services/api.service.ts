import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  private handleError(errors: any) {
    console.log('hadleError');
    return new ErrorObservable(errors);
  }

  get(path: string, data: any = {}, options: any = {}): Observable<any> {
    options.params = data;
    return this.http.get(`${path}`, options);
      // .pipe(catchError(this.handleError));
  }

  post(path: string, body: Object = {}, options: any = {}): Observable<any> {
    return this.http.post(`${path}`, body, options)
      .pipe(catchError(this.handleError));
  }

  put(path: string, body: Object = {}, options: any = {}): Observable<any> {
    return this.http.put(`${path}`, body, options)
      .pipe(catchError(this.handleError));
  }

  delete(path: string, data: any = {}, options: any = {}): Observable<any> {
    options.params = data;
    return this.http.delete(`${path}`, options)
      .pipe(catchError(this.handleError));
  }

}
