import * as fs from 'fs';
import { parse } from 'jekyll-markdown-parser';

import * as tangos from './index';
import { PostService } from '../services/post.service';

export class TangosCli {
  constructor(
    private options: any = {},
    private util: tangos.Util = new tangos.Util(),
    private postService: PostService = new PostService()
  ) {}

  run() {
    const { cmd } = this.options;
    switch (cmd) {
      // generate imagestore
      case 'imagestore': {
        const { path } = this.options;
        this.createImageStore(path);
        break;
      }

      // generate fake data
      case 'fake': {
        // console.log('fake!!!!');
        const { n, output } = this.options;
        this.postService.createFakePosts(n, output).subscribe(data => {
          // create index
          this.createPostIndex(output);
          // craete thumnail
          this.createThumbnails(output);

          console.log('createFakePosts success:', data);
        });
        break;
      }

      // new post
      case 'post': {
        const { path } = this.options;
        this.postService.createPostSkelton(path).subscribe(data => {
          console.log(`Post created: ${data}`);
        });
        break;
      }

      default: {
        console.error('options not found: ', cmd);
      }
    }
    console.log('run:', this.options);
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
        const data = files.filter(file => file.match(/\.(xml|md|html)$/)).map(file => {
          const md = fs.readFileSync(`${path}/${file}`);
          const { parsedYaml } = parse(md.toString());
          return parsedYaml;
        });
        this.util.saveJSON(output, data, { overwrite: true });
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
