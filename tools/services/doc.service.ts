import { parse } from 'jekyll-markdown-parser';
import { XmlEntities, AllHtmlEntities } from 'html-entities';
import { JSDOM } from 'jsdom';

export class DocService {

  constructor() { }

  parseXML(xslResponse, xmlResponse, id) {
    try {

      const parseDom = (doc, selector: string = null) => {
        const { document } = new JSDOM(doc).window;
        return (selector) ? document.querySelectorAll(selector) : document;
      };

      const xml = parseDom(xmlResponse);
      const metas = parseDom(xslResponse, 'meta[property^="cms:"]');
      // console.log({ metas, xml });

      // <meta property="cms:title" content = "title" />
      // <meta property="cms:publishedAt" content = "pubDate" />
      // <meta property="cms:desc" content = "content" />
      // <meta property="cms:author" content = "author" />

      const doc = { id };
      metas.forEach(meta => {
        const selector = meta.getAttribute('content');
        const key = meta.getAttribute('property').replace(/cms:/, '');
        const data = xml.querySelector(selector);
        doc[key] = ['title', 'content'].indexOf(selector) === -1
          ? data.innerHTML
          : XmlEntities.decode(data.innerHTML)
            .replace(/(&[0-9a-z]+;)/ig, (match, capture) => {
              return AllHtmlEntities.decode(capture).trim();
            })
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/, ' ')
            .substring(0, 400);
        // TODO: Add coverImage
      });

      return doc;
    } catch (e) {
      console.error({ e });
      return '';
    }
  }

  // @return { desc, coverImage }
  parseHTML(html: string) {
    let doc = {};
    const desc = XmlEntities.decode(html)
      .replace(/(&[0-9a-z]+;)/ig, (match, capture) => {
        return AllHtmlEntities.decode(capture).trim();
      })
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/, ' ')
      .substring(0, 400);

    if (!!desc) {
      doc = { ...doc, desc };
    }

    const [, coverImage] = html.match(/<img [^>]*src="(.*?)"[^>]*>/i) || [null, null];

    if (!!coverImage) {
      doc = { ...doc, coverImage };
    }
    return doc;
  }

}
