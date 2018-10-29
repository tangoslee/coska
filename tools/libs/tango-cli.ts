import * as faker from 'faker';
import * as uniqid from 'uniqid';
import * as fs from 'fs';
import * as sharp from 'sharp';

import { Observable } from 'rxjs/Observable';
import { parse } from 'jekyll-markdown-parser';

import * as tangos from './index';
import { FakePost } from './fake-post';


export class TangoCli {

  constructor(
    private options: any = {},
    private util: tangos.Util = new tangos.Util(),
  ) {
  }

  run() {
    const { cmd } = this.options;
    switch (cmd) {
      case 'fake': {
        // console.log('fake!!!!');
        const { n, output } = this.options;
        this.createFakePosts(n, output)
          .subscribe(data => {
            console.log('createFakePosts success:', data);
            // create index
            this.createPostIndex(output);

            // craete thumnail
            this.createThumbnails(output);
          });
        break;
      }

      default: {
        console.error('options not found: ', cmd);
      }
    }
    console.log('run:', this.options);
  }

  createFakePosts(n: number = 100, output: string = null): Observable<any> {
    return new Observable(observer => {

      const writes = [];
      for (let i = 0; i < n; i++) {
        const post = new FakePost(output);

        // write post
        const result = this.util.writeFile(`${output}/${post.id}.md`, post);
        writes.push(result);
      }

      Promise.all(writes)
        .then(data => {
          observer.next(data);
          observer.complete();
        });
    });
  }

  createPostIndex(path: string = null) {
    const output = `${path}/index.json`;
    // const index = this.util.loadJSON(src);
    // console.log({ index });
    console.log('read ', path);
    return new Promise((resolve, reject) => {

      fs.readdir(path, (err, files) => {
        const data = files
          .filter(file => file.match(/\.(xml|md|html)$/))
          .map(file => {
            const md = fs.readFileSync(`${path}/${file}`);
            const { parsedYaml } = parse(md.toString());
            return parsedYaml;
          });
        this.util.saveJSON(output, data);
      });
    });
  }



  createThumbnails(path: string = null) {
    console.log({ path });
    const width = 300;
    const height = 200;
    

    
    this.util.thumbs(path, width, height);


  }

}