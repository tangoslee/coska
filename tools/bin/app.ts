#!/usr/bin/env node

import { Util } from '../libs';
import { AppCli } from '../libs/app-cli';


const util = new Util();
const options = util.getOptions();

const appCli = new AppCli(options);
appCli.run();
