import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class HomeService {

  constructor(
    private apiService: ApiService,
  ) { }

  init(): Observable<any> {
    return this.apiService.get(`${environment.API_URL}/assets/api/init.json`);
  }

  getHTML(path: string): Observable<any> {

    // console.log({ key });
    // https://angular.io/guide/http#requesting-non-json-data
    const options = {
      responseType: 'text',
      headers: {
        'Content-type': 'text/html; charset=utf-8'
      }
    };


    // this.appService.loading();
    return this.apiService.get(`${environment.API_URL}/assets/htmls/${path}.html`, {}, options);
  }

  getMarkDown(path: string): Observable<any> {
    const options = {
      responseType: 'text',
      headers: {
        'Content-type': 'text/html; charset=utf-8'
      }
    };
    // this.appService.loading();
    return this.apiService.get(`${environment.API_URL}/assets/markdowns/${path}.md`, {}, options);
  }

  /**
   *
   * @param path : string
   *
   * @see
   * https://developer.mozilla.org/en-US/docs/Web/XSLT/XSLT_JS_interface_in_Gecko/Basic_Example
   * https://www.w3schools.com/xml/xml_xslt.asp
   */
  getXML(path: string): Observable<any> {
    const options = {
      responseType: 'text',
      headers: {
        'Content-type': 'text/html; charset=utf-8'
      }
    };

    const xslRequest = this.apiService.get(`${environment.API_URL}/assets/xmls/${path}.xsl`, {}, options);
    const xmlRequest = this.apiService.get(`${environment.API_URL}/assets/xmls/${path}.xml`, {}, options);

    return forkJoin([xslRequest, xmlRequest]).pipe(
      map(([xslResponse, xmlResponse]) => {

        try {
          const parser = new DOMParser();
          const xsl = parser.parseFromString(xslResponse, 'application/xml');
          const xml = parser.parseFromString(xmlResponse, 'application/xml');


          const xslt = new XSLTProcessor();
          xslt.importStylesheet(xsl);

          console.log(xml);

          const dom = xslt.transformToFragment(xml, document);
          console.log({ dom });
          const html = (new XMLSerializer()).serializeToString(dom);

          return html;
        } catch (e) {
          console.error(e);
          return '';
        }
      }));
  }
}
