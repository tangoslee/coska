import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';

export class Util {

  getAppRoot() {
    return path.basename(`${__dirname}/../../`);
  }

  cwd() {
    return path.basename(process.cwd());
  }

  isdir(path) {
    try {
      return fs.statSync(path).isDirectory();
    } catch (e) {
      return false;
    }
  }

  mkdir(path, recursive = false, mode = 0o777) {

    const options = { recursive, mode };

    return new Promise((resolve, reject) => {

      fs.mkdir(path, (err) => {
        if (err) {
          const { code } = err;
          if (code === 'EEXIST') return resolve(path);
          return reject(err);
        }
        return resolve(path);
      });

    });
  }

  link(src, target) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(target)) {
        fs.unlinkSync(target);
      }
      fs.link(src, target, (err) => {
        if (err) return reject(err);
        return resolve(target);
      });
    });
  }

  writeFile(path, body) {
    // console.log(`write to ${path}`);
    return new Promise((resolve, reject) => {
      fs.writeFile(path, body, (err) => {
        if (err) return reject(err);
        return resolve(path);
      });
    });
  }

  loadJSON(path: string) {
    if (!fs.existsSync(path)) {
      return {};
    }
    const raw = fs.readFileSync(path);
    return JSON.parse(raw.toString());
  }

  saveJSON(output: string, data: any = {}) {
    const json = JSON.stringify(data);
    this.writeFile(output, json)
      .catch(err => console.error(err));
  }

  // convert process.argv to a key:value pairs.
  getOptions() {
    const [, , ...remains] = process.argv;
    const options = {};
    for (let i = 0; i < remains.length; i += 2) {
      const [key, value] = remains.slice(i, i + 2);
      options[key] = value;
    }
    return options;
  }

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


  thumbs(path: string, width: number, height: number) {

    console.log({ path });
    const defaultResolution = `_${width}x0`;

    fs.readdir(path, (err, items) => {
      console.log({ items });

      items
        .filter(item => {
          if (this.isdir(`${path}/${item}`)) {
            this.thumbs(`${path}/${item}`, width, height);
            return false;
          }
          return item.match(/\.(jpeg|png|gif|jpg)$/i)
        })
        .filter(item => !item.match(`_${width}x`))
        .map(item => {
          const [ext, remains] = item.match(/\.[a-zA-Z0-9]{3,4}$/);
          const img = item.replace(ext, `${defaultResolution}${ext}`);  // xxxx_300x0.jpeg
          const src = `${path}/${item}`;

          // console.log({ newpath: `${path}/${item}` });

          const output1 = `${path}/${img}`;
          const output2 = output1.replace(defaultResolution, `_${width}x${height}`);
          const output3 = output1.replace(defaultResolution, `_800x0`);

          // console.log({ output1, output2 });
          // const resize1 = this.resize(src, width, 0, output1);
          const resize2 = this.resize(src, width, height, output2);
          const resize3 = this.resize(src, 800, 0, output3);

          Promise.all([resize2, resize3])
            .then(data => {
              data.map(({size}) => console.log(`resize done: ${size} bytes`));
            });
        });
    });

  }
}
