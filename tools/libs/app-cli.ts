import * as fs from 'fs';
import { parse } from 'jekyll-markdown-parser';

import * as tangos from './index';
import {
  PostService,
  MenuService,
  CommandsTypes,
} from '../services';
import { Spinner } from 'clui';
import { textSync } from 'figlet';
import { default as chalk } from 'chalk';
import { DocService } from '../services/doc.service';
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
    private spinner: Spinner = new Spinner('Please wait...'),
  ) {
    this.state = this.util.loadJSON(`${__dirname}/../../src/assets/api/init.json`);
  }

  displayLogo() {
    log(chalk.yellow(textSync('Coska CMS', { horizontalLayout: 'full' })));
  }

  async run() {
    this.displayLogo();

    let cmd = null;
    let ppgid = null;
    let pgid = null;

    let idx = 3;
    while (idx > 0) {
      switch (idx) {
        case 3: {
          const data = await this.menuService.inquiryCommand();
          cmd = data.cmd;
          if (cmd === CommandsTypes.EXIT) {
            return;
          }
          --idx;
        }

        case 2: {
          const data = await this.menuService.inquiryMainMenu();
          ppgid = data.ppgid;
          if (ppgid === CommandsTypes.GO_BACK) {
            idx = 3;
            break;
          }
          --idx;
        }

        case 1: {
          const data = await this.menuService.inquirySubMenu(ppgid);
          pgid = data.pgid;
          if (pgid === CommandsTypes.GO_BACK) {
            idx = 2;
            break;
          }
          --idx;
        }
      }
    }

    // console.log({ cmd, ppgid, pgid });

    const layout = this.menuService.pgidMap[`${ppgid}/${pgid}`];
    const params = {
      ppgid,
      pgid,
      layout,
    };
    const { assets } = this.state;
    const output = `${assets}/${layout}/${ppgid}/${pgid}`;

    switch (cmd) {
      case CommandsTypes.ADD_POST: {
        const [, info] = await this.postService.createPostSkelton(params);
        return log(`Post skeleton created: `, info);
      }

      case CommandsTypes.ADD_FAKE_POST: {
        const { qty } = await this.menuService.inquiryFakePostNumber();
        const info = await this.postService.createFakePosts(qty, output);
        // create index
        this.createPostIndex(output);
        // craete thumnail
        this.createThumbnails(output);
        return log(`Fake posts created: `, info);
      }

      case CommandsTypes.INIT_THUMBS: {
        this.createThumbnails(output);
      }

      case CommandsTypes.INIT_INDEX: {
        this.createPostIndex(output);
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
            console.log({ name, ext });
            const content = fs.readFileSync(`${path}/${file}`, 'utf8');
            switch (ext) {
              case 'md': {
                const { parsedYaml } = parse(content.toString());
                return parsedYaml;
              }
              case 'xml': {
                const xmlResponse = content.toString();
                const xslResponse = fs.readFileSync(`${path}/index.xsl`, 'utf8').toString();
                const docService: DocService = new DocService();
                const doc = docService.parseXML(xslResponse, xmlResponse, name);
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
        files.filter(file => !file.match(/\.(xml|md|html|json)$/)).map(file => {
          this.util.thumbs(`${path}/${file}`, 300, 0);
        });
      });
    });
  }

}
