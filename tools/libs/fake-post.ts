import * as faker from 'faker';
import * as uniqid from 'uniqid';
import * as fs from 'fs';
import * as path from 'path';
import * as tangos from './index';

import { Post } from '@app/core/models';
import { imageStore } from './image-store';
import { fstat } from 'fs';
import { Util } from './util';

const imagePattern = /!\[[^\]]+\]\(([^\)]+)\)/;

export class FakePost implements Post {

  id: string;
  title: string;
  body: any;
  publishedAt: any;
  coverImage: string;
  link?: string;

  imageOutput: string;

  constructor(
    private output: string = null,
    private util: Util = new Util(),
  ) {
    this.id = uniqid();
    this.title = faker.fake("{{lorem.sentence}}");
    this.publishedAt = faker.fake("{{date.past}}");

    // mkdir output/id for images
    this.imageOutput = `${output}/${this.id}`;


    this.body = this.getBody();
    const images = this.body.match(imagePattern);
    // console.log({images: images});
    this.coverImage = (images) ? images[1].replace(/_800x0/, '_300x0') : ''; // this.getRandomImage();

  }

  rand(max: number = 100): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getRandomImage(): string {
    const { storePath, images } = imageStore;
    const size = images.length;
    const i = this.rand(10000);
    const image = images[i % size];
    const target = `${this.imageOutput}/${image.replace('_300x0', '')}`;

    // copy file
    this.util.mkdir(this.imageOutput, true)
      .then(() => {
        this.util.link(`${storePath}/${image.replace('_300x0', '')}`, target)
          .catch(err => console.error(err));
        ;
      });

      // replace .src/assets => /assets
    return `${path.dirname(target).replace(/\S+\/assets/, 'assets')}/${image}`;
  }

  getRandomBody(n: number = 1): string {
    let body = '';
    if (n === 0) n = 1;
    for (let i = 0; i < n; ++i) {
      body += `

${faker.fake("{{lorem.paragraphs}}")}
`;
    }
    return body;
  }

  getSampleBodyImageText(): string {
    return `![image from pexels.com](${this.getRandomImage().replace('_300x0', '_800x0')})

${faker.fake("{{lorem.paragraphs}}")}
`;
  }

  getSampleBodyTextImages(): string {
    let images = '';
    for (let i = 0; i < this.rand(20); ++i) {
      images += `
![image from pexels.com](${this.getRandomImage().replace('_300x0', '_800x0')})
`;
    }
    return `
${this.getRandomBody(this.rand(1000) % 9 + 1)}

${images}
`;
  }

  getSampleBodyTexts(): string {
    return this.getRandomBody(this.rand(1000) % 9 + 1);
  }

  getBody(type: number = this.rand(1000) % 4): string {

    switch (type) {
      case 0: {   // image + text
        return this.getSampleBodyImageText();
      }

      case 1: {  // text; 1 ~ 10
        return this.getSampleBodyTexts();
      }

      case 2: { // text + images
        return this.getSampleBodyTextImages();

      }

      case 3: { // image + text + image + text
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

  create(): Post {
    // console.log('create post does not support yet');
    const post: Post = {
      id: uniqid(),
      title: faker.fake("{{lorem.sentence}}"),
      body: this.getBody(),
      publishedAt: faker.fake("{{date.past}}"),
      coverImage: this.getRandomImage(),
    };
    // console.log({ post });
    return post;
  }

  update() {
    console.log('update post does not support yet');
  }

  edit() {
    console.log('edit post does not support yet');
  }

  delete() {
    console.log('delete post does not support yet');
  }

  toString(): string {
    const content =  `
---
id: ${this.id}
title: ${this.title}
publishedAt: ${this.publishedAt}
body: ${this.body.replace(imagePattern, '').replace(/\s{2,}/sg, ' ').substring(0, 140).trim()}
coverImage: ${this.coverImage}

---

${this.body}
`;

    return (this.coverImage) ? content : content.replace(/coverImage: .*?/, '');

  };

}