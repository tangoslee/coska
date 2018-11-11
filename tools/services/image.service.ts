import {
  readFileSync,
  mkdirSync,
  existsSync,
  unlinkSync,
  link,
  writeFile,
  readdirSync,
  statSync
} from 'fs';
import { dirname, basename } from 'path';
import * as sharp from 'sharp';
import * as readline from 'readline';
import { Util } from '../libs';

export class ImageService {
  constructor(
    private util: Util = new Util(),
  ) { }

  resize(input: string, width: number, height: number, output: string) {
    // console.log({ input, output, width, height });return;
    return new Promise((resolve, reject) => {
      const convert = sharp(input);
      if (height > 0) {
        convert.resize(width, height);
      } else {
        convert.resize(width);
      }
      convert.toFile(output, (err, info) => {
        // console.log({ err, info });
        if (err) return reject(err);
        return resolve(info);
      });
    });
  }

  thumbs(path: string, width: number, height: number, retry: number = 3) {
    const resizes = [];
    const loadings = ['-', '\\', '|', '/'];

    if (retry === 0) {
      console.error('no more try');
      return false;
    }

    const items = readdirSync(path);

    items
      .filter(item => {
        // check path is directory or file
        if (this.util.isdir(`${path}/${item}`)) {
          this.thumbs(`${path}/${item}`, width, height);
          return false;
        }
        return item.match(/\.(jpeg|png|gif|jpg)$/i);
      })
      // filter origin files
      .filter(item => !item.match(`_${width}x`))
      .map((item, i, _items) => {
        const { name, ext } = this.util.parseFileName(item, false);
        const img = `${name}_${width}x${height}.${ext}`; // xxxx_300x0.jpeg

        const src = `${path}/${item}`;
        const output = `${path}/${img}`;

        this.resize(src, width, height, output)
          .then(() => {
            readline.cursorTo(process.stdout, 0);
            readline.clearLine(process.stdout, 1);
            process.stdout.write(`${loadings[i % 4]} ${output}${String.fromCharCode(13)}`);
            // process.stdout.write(`${loadings[i % 4]}${String.fromCharCode(13)}`);
            if (i === _items.length - 1) {
              readline.clearLine(process.stdout, 0);
              readline.cursorTo(process.stdout, 0);
            }
          })
          .catch(error => {
            if (retry > 0) {
              console.log('Error Retry: ', retry, ', path:', path);
              setTimeout(() => {
                this.thumbs(path, width, height, retry - 1);
              }, 3000);
            }
            process.stderr.write(`ResizeError: ${src}${String.fromCharCode(13)}`);
            readline.cursorTo(process.stdout, 0);
          });
      });
  }
}
