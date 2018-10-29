import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { parse } from 'jekyll-markdown-parser';
import { Content } from '@app/core/models';
import { Post } from '@app/core/models/post';
import { Section } from '@app/core/models/section';

@Injectable()
export class HomeService {

  constructor(
    private apiService: ApiService,
  ) { }

  init(): Observable<any> {
    return this.apiService.get(`${environment.API_URL}/assets/api/init.json`);
  }

  getHTML(path: string): Observable<Content> {

    // console.log({ key });
    // https://angular.io/guide/http#requesting-non-json-data
    const options = {
      responseType: 'text',
      headers: {
        'Content-type': 'text/html; charset=utf-8'
      }
    };


    // this.appService.loading();
    return this.apiService.get(`${environment.API_URL}/assets/${path}.html`, {}, options)
      .pipe(
        map(data => {
          return { type: 'html', id: path, body: data, meta: null };
        }));
  }

  getMarkDown(path: string): Observable<Content> {
    const options = {
      responseType: 'text',
      headers: {
        'Content-type': 'text/html; charset=utf-8'
      }
    };
    return this.apiService.get(`${environment.API_URL}/assets/${path}.md`, {}, options)
      .pipe(map(data => {
        const parsed = parse(data);
        const html = parsed.html.replace(
          /<pre><code class="lang\-([^\"]+)"/mg,
          '<pre class="language-$1"><code class="language-$1"'
        );

        // By Prismjs CSS Rule, code must be <pre class="language-xxx"><code class="language-xxx">
        return { type: 'markdown', id: path, body: html, meta: parsed.parsedYaml };
      }));
  }

  /**
   *
   * @param path : string
   *
   * @see
   * https://developer.mozilla.org/en-US/docs/Web/XSLT/XSLT_JS_interface_in_Gecko/Basic_Example
   * https://www.w3schools.com/xml/xml_xslt.asp
   */
  getXML(path: string): Observable<Content> {
    const options = {
      responseType: 'text',
      headers: {
        'Content-type': 'text/html; charset=utf-8'
      }
    };

    const xslRequest = this.apiService.get(`${environment.API_URL}/assets/${path}.xsl`, {}, options);
    const xmlRequest = this.apiService.get(`${environment.API_URL}/assets/${path}.xml`, {}, options);

    return forkJoin([xslRequest, xmlRequest]).pipe(
      map(([xslResponse, xmlResponse]) => {

        try {
          const parser = new DOMParser();
          const xsl = parser.parseFromString(xslResponse, 'application/xml');
          const xml = parser.parseFromString(xmlResponse, 'application/xml');


          const xslt = new XSLTProcessor();
          xslt.importStylesheet(xsl);

          const dom = xslt.transformToFragment(xml, document);
          const html = (new XMLSerializer()).serializeToString(dom);

          return { type: 'xml', id: path, body: html, meta: null };
        } catch (e) {
          console.error(e);
          throw e;
        }
      }));
  }


  getSection(path: string): Observable<Section> {
    // this.appService.loading();
    return this.apiService.get(`${environment.API_URL}/assets/${path}/index.json`)
      .pipe(
        map(data => {
          return { posts: data };
        }));
  }
}
