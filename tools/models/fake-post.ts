import * as faker from 'faker';
import * as uniqid from 'uniqid';
import * as path from 'path';

import { Post } from '../../src/app/core/models';
import { Util } from '../libs/util';
import { ImageService } from '../services/image.service';

export class FakePost extends Post {
  imageOutput: string;

  constructor(
    private output: string = null,
    private util: Util = new Util(),
    private imageService: ImageService = new ImageService(),
  ) {
    super({ id: uniqid() });

    this.imageOutput = `${output}/${this.id}`;

    this.title = faker.fake('{{lorem.sentence}}');
    this.publishedAt = faker.fake('{{date.past}}');
    this.body = this.getBody();
  }

  rand(max: number = 100): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getRandomImage(): string {
    const { storePath, images } = this.util.loadJSON(
      `${__dirname}/../libs/image-store.json`,
    );
    const size = images.length;
    const i = this.rand(10000);
    const image = images[i % size];
    const target = `${this.imageOutput}/${image}`;

    // copy file
    this.util.mkdir(this.imageOutput, true);

    // this.util.link(`${storePath}/${image}`, target)
    this.imageService
      .resize(`${storePath}/${image}`, 800, 0, target)
      .then(data => {
        // process.stdout.write('\x1Bc');
        // process.stdout.write(`Origin image generated: ${target}${String.fromCharCode(13)}`);
        // console.log(`Origin image generated: ${target}${String.fromCharCode(13)}`);
      })
      .catch(err => console.error(err));

    // replace .src/assets => /assets
    return `${path.dirname(target).replace(/\S+\/assets/, 'assets')}/${image}`;
  }

  getRandomBody(n: number = 1): string {
    let body = '';
    if (n === 0) n = 1;
    for (let i = 0; i < n; ++i) {
      body += `

${faker.fake('{{lorem.paragraphs}}')}
`;
    }
    return body;
  }

  getSampleBodyImageText(): string {
    return `![image from pexels.com](${this.getRandomImage()})

${faker.fake('{{lorem.paragraphs}}')}
`;
  }

  getSampleBodyTextImages(): string {
    let images = '';
    for (let i = 0; i < this.rand(20); ++i) {
      images += `
![image from pexels.com](${this.getRandomImage()})
`;
    }
    return `
${this.getRandomBody((this.rand(1000) % 9) + 1)}

${images}
`;
  }

  getSampleBodyTexts(): string {
    return this.getRandomBody((this.rand(1000) % 9) + 1);
  }

  getBody(type: number = this.rand(1000) % 4): string {
    switch (type) {
      case 0: {
        // image + text
        return this.getSampleBodyImageText();
      }

      case 1: {
        // text; 1 ~ 10
        return this.getSampleBodyTexts();
      }

      case 2: {
        // text + images
        return this.getSampleBodyTextImages();
      }

      case 3: {
        // image + text + image + text
        const counts = [];
        for (let i = 0; i < this.rand(5); ++i) {
          counts.push(this.getSampleBodyTextImages());
        }
        return counts.join('\n');
      }

      default: {
        return '';
      }
    }
  }
}
