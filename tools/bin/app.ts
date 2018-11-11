#!/usr/bin/env node

import { Util } from '../libs';
import { AppCli } from '../libs/app-cli';


const util = new Util();
const options: any = util.getOptions();

// console.log({ options });

const appCli = new AppCli(options);

// { options: { cmd: 'imagestore', path: '../pexels/camping/' } }
const { cmd } = options;
switch (cmd) {
  case 'imagestore': {
    const { path } = options;
    appCli.createImageStore(path);
    break;
  }
  default: {
    appCli.run();
    break;
  }
}

