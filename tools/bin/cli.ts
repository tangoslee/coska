#!/usr/bin/env node

import * as faker from 'faker';
import * as uniqid from 'uniqid';
import * as fs from 'fs';
import * as sharp from 'sharp';

import { Util } from '../libs';
import { TangoCli } from '../libs/tango-cli';


const util = new Util();
const options = util.getOptions();

const tangosCli = new TangoCli(options);
tangosCli.run();




// // process.argv;
// const size = images.length;
// const posts: Post[] = [];
// const imagePath = 'assets/section/m03/m030103'

// const createFakePost = (i: number): Post => {
//   const post: Post = {
//     id: uniqid(),
//     title: faker.fake("{{lorem.sentence}}"),
//     body: faker.fake("{{lorem.paragraphs}}"),
//     publishedAt: faker.fake("{{date.past}}"),
//     coverImage: `/${imagePath}/${images[i % size]}`,
//   };
//   return post;
// };

// const createFakePosts = () => {
//   for (let i = 0; i < 100; i++) {
//     posts.push(createFakePost(i));
//   }
//   console.log(JSON.stringify(posts));
// }

// const resize = (input, width, height, output) => {
//   // console.log({ input, output, width, height });return;
//   const convert = sharp(input);
//   if (height > 0) {
//     convert.resize(width, height);
//   } else {
//     convert.resize(width);
//   }
//   convert.toFile(output, (err, info) => {
//     console.log({ err, info });
//   });
// };

// const createThumbNails = (path) => {
//   console.log({ path });
//   const width = 300;
//   const height = 200;
//   const defaultResolution = `_${width}x0`;

//   fs.readdir(path, (err, items) => {
//     // item: pexels-photo-967098.jpeg
//     // console.log(items);
//     items.map(item => {
//       // skip thumnail
//       if (item.match(`_${width}x`)) return;

//       const [ext, remains] = item.match(/\.[a-zA-Z0-9]{3,4}$/);
//       const img = item.replace(ext, `${defaultResolution}${ext}`);  // xxxx_300x0.jpeg
//       const src = `${path}/${item}`;
//       const output1 = `${path}/${img}`;
//       const output2 = output1.replace(defaultResolution, `_${width}x${height}`);
//       // console.log({item, src, output1});
//       // console.log({ src, output1, output2 });
//       resize(src, width, 0, output1);
//       resize(src, width, height, output2);
//     });
//   });
// }

// // main
// const postImageDir = `${__dirname}/../../src/${imagePath}`;
// // createFakePosts();
// // createThumbNails(postImageDir);



