import * as fs from 'fs';
import { parse } from 'jekyll-markdown-parser';

import * as tangos from './index';
import { PostService, MenuService, CommandsTypes } from '../services';
import { Spinner } from 'clui';
import { textSync } from 'figlet';
import { default as chalk } from 'chalk';
import { DocService } from '../services/doc.service';
import { ImageService } from '../services/image.service';
// import { HomeService } from '@app/home/services';
// import { Observable } from 'rxjs/Observable';
// import { default as uniqid } from 'uniqid';

const log = console.log;

export class AppCli {
  state: any;

  constructor(
    private options: any = {},
    private util: tangos.Util = new tangos.Util(),
    private postService: PostService = new PostService(),
    private menuService: MenuService = new MenuService(),
    private imageService: ImageService = new ImageService(),
    private spinner: Spinner = new Spinner('Please wait...'),
    private docService: DocService = new DocService(),
  ) {
    this.state = this.util.loadJSON(
      `${__dirname}/../../src/assets/api/init.json`,
    );
  }

  displayLogo() {
    log(chalk.yellow(textSync('Coska CMS', { horizontalLayout: 'full' })));
  }

  async run() {
    this.displayLogo();

    let ppgid = null;
    let pgid = null;
    let cmd = null;

    while (true) {
      switch (cmd) {
        case CommandsTypes.ADD_POST: {
          const { layout, ppgid, pgid } = await this.menuService.inquirySectionMarkDown();
          if (ppgid === CommandsTypes.GO_BACK) {
            cmd = null;
            break;
          }
          const [, info] = await this.postService.createPostSkelton({ layout, ppgid, pgid });
          return log(`Post skeleton is created: `, info);
        }

        case CommandsTypes.ADD_FAKE_POST: {
          const { assets } = this.state;
          const { layout, ppgid, pgid } = await this.menuService.inquirySectionMarkDown();
          const output = `${assets}/${layout}/${ppgid}/${pgid}`;
          const { qty } = await this.menuService.inquiryFakePostNumber();
          const info = await this.postService.createFakePosts(qty, output);

          // create index
          this.createPostIndex(output);
          // craete thumnail
          this.createThumbnails(output);
          return log(`Fake posts are created: `, info.length);
        }

        case CommandsTypes.INIT_THUMBS: {
          const { layout, ppgid, pgid } = await this.menuService.inquirySectionMarkDown();
          const { assets } = this.state;
          const output = `${assets}/${layout}/${ppgid}/${pgid}`;
          this.createThumbnails(output);
          return log('Thumbnails are regenerated.');
        }

        case CommandsTypes.INIT_INDEX: {
          // layout:section
          const { layout, ppgid, pgid } = await this.menuService.inquirySection();
          if (ppgid === CommandsTypes.GO_BACK) {
            cmd = null;
            break;
          }
          const { assets } = this.state;
          const output = `${assets}/${layout}/${ppgid}/${pgid}`;
          this.createPostIndex(output);
          return log(`Post index is created`);
        }

        default: {
          const data = await this.menuService.inquiryCommand();
          cmd = data.cmd;
          break;
        }
      }
    }
  }

  createImageStore(storePath: string = null) {
    const output = `${__dirname}/image-store.json`;

    fs.readdir(storePath, (err, images) => {
      if (err) {
        console.error(err);
        return;
      }
      this.util.saveJSON(output, { storePath, images }, { overwrite: true });
    });
  }

  createPostIndex(path: string = null) {
    const output = `${path}/index.json`;

    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        const data = files
          .filter(file => file.match(/\.(xml|md|html)$/))
          .map(file => {
            const { name, ext } = this.util.parseFileName(file);
            // console.log({ name, ext });
            const content = fs.readFileSync(`${path}/${file}`, 'utf8');
            switch (ext) {
              case 'md': {
                const { parsedYaml, html, yaml, markdown } = parse(content.toString());
                // console.log({ parsedYaml, html, yaml, markdown });
                const doc = this.docService.parseHTML(html);
                return { ...parsedYaml, ...doc };
              }
              case 'xml': {
                const xmlResponse = content.toString();
                const xslResponse = fs
                  .readFileSync(`${path}/index.xsl`, 'utf8')
                  .toString();

                const doc = this.docService.parseXML(xslResponse, xmlResponse, name);
                return doc;
              }

              case 'html':
              default:
                console.error(`Index service does not support .${ext} files`);
                return null;
            }
          });
        if (data !== null) {
          this.util.saveJSON(output, data, { overwrite: true });
        }
      });
    });
  }

  createThumbnails(path: string = null) {
    // 300x200, 300x0
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        files
          .filter(file => !file.match(/\.(xml|md|html|json)$/))
          .map(file => {
            this.imageService.thumbs(`${path}/${file}`, 300, 0);
          });
      });
    });
  }
}
