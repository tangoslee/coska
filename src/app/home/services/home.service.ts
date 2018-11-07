import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { parse } from 'jekyll-markdown-parser';
import { Content } from '@app/core/models';
import { Section } from '@app/core/models/section';

import * as htmlEntities from 'html-entities';

@Injectable()
export class HomeService {
  constructor(private apiService: ApiService) {}

  init(): Observable<any> {
    return this.apiService.get(`${environment.API_URL}/assets/api/init.json`);
  }

  getHTML(path: string): Observable<Content> {
    // console.log({ key });
    // https://angular.io/guide/http#requesting-non-json-data
    const options = {
      responseType: 'text',
      headers: {
        'Content-type': 'text/html; charset=utf-8',
      },
    };

    // this.appService.loading();
    return this.apiService.get(`${environment.API_URL}/assets/${path}.html`, {}, options).pipe(
      map(data => {
        return { doctype: 'html', id: path, body: data, meta: null };
      })
    );
  }

  getMarkDown(path: string): Observable<Content> {
    const options = {
      responseType: 'text',
      headers: {
        'Content-type': 'text/html; charset=utf-8',
      },
    };
    return this.apiService.get(`${environment.API_URL}/assets/${path}.md`, {}, options).pipe(
      map(data => {
        const parsed = parse(data);
        const html = parsed.html
          .replace(
            /<pre><code class="lang\-([^\"]+)"/gm,
            '<pre class="language-$1"><code class="language-$1"'
          )
          // <p><img ....></p> => <figure><img ....><figurecaption>...</figuracaption></figure>
          .replace(
            /<p>(<img .*?alt="(.*?)"[^>]*>)<\/p>/gm,
            '<figure class="post-image">$1<figurecaption>$2</figurecaption></figure>'
          );
        // console.log({ html });

        // By Prismjs CSS Rule, code must be <pre class="language-xxx"><code class="language-xxx">
        return { doctype: 'markdown', id: path, body: html, meta: parsed.parsedYaml };
      })
    );
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
        'Content-type': 'text/html; charset=utf-8',
      },
    };

    const basedir = path
      .split('/')
      .reduce((str, token, i, arr) => {
        return i < arr.length - 1 ? [...str, token] : str;
      }, [])
      .join('/');

    // check section or pages
    const isSection = path.match(/^\/section\//);

    const xslFile = isSection
      ? `${environment.API_URL}/assets/${basedir}/index.xsl`
      : `${environment.API_URL}/assets/${path}.xsl`;

    const xslRequest = this.apiService.get(xslFile, {}, options);
    const xmlRequest = this.apiService.get(
      `${environment.API_URL}/assets/${path}.xml`,
      {},
      options
    );

    return forkJoin([xslRequest, xmlRequest]).pipe(
      map(([xslResponse, xmlResponse]) => {
        try {
          const parser = new DOMParser();
          const xsl = parser.parseFromString(xslResponse, 'application/xml');
          const xml = parser.parseFromString(xmlResponse, 'application/xml');

          // FIXME: IE doesn't support XSLTProcessor
          const xslt = new XSLTProcessor();
          xslt.importStylesheet(xsl);

          let dom = xslt.transformToFragment(xml, document);

          // decode HTML Entity for archive XML
          if (isSection) {
            dom = this.decodeEntityInnerHTML(dom, 'h1.display-8');
            dom = this.decodeEntityInnerHTML(dom, 'div.media.item-body');
          }

          const html = new XMLSerializer().serializeToString(dom);
          // console.log({ html });

          return { doctype: 'xml', id: path, body: html, meta: null };
        } catch (e) {
          console.error(e);
          throw e;
        }
      })
    );
  }

  decodeEntityInnerHTML(dom, tag) {
    const entity = htmlEntities.XmlEntities;
    const before = dom.querySelector(tag).innerHTML;
    // console.log('before: ', before);
    const after = before.replace(/(&[0-9a-zA-Z]+;)/g, (match, capture) => {
      return entity.decode(capture);
    });
    // console.log('after: ', after);
    dom.querySelector(tag).innerHTML = after;
    return dom;
  }

  getSection(path: string): Observable<Section> {
    // this.appService.loading();
    return this.apiService.get(`${environment.API_URL}/assets/${path}/index.json`).pipe(
      map(data => {
        return { posts: data };
      })
    );
  }
}
