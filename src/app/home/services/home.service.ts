import { Injectable } from '@angular/core';
import { ApiService } from '@app/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomeService {

  constructor(
    private apiService: ApiService,
  ) { }

  init(): Observable<any> {
    return this.apiService.get(`${environment.API_URL}/assets/api/init.json`);
  }

  getPages(path: string): Observable<any> {

    // console.log({ key });
    // https://angular.io/guide/http#requesting-non-json-data
    const options = {
      responseType: 'text',
      headers: {
        'Content-type': 'text/html; charset=utf-8'
      }
    };


    // this.appService.loading();
    return this.apiService.get(`${environment.API_URL}/assets/pages/${path}.html`, {}, options);
  }
}
