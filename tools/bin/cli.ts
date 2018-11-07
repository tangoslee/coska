#!/usr/bin/env node

import { Util } from '../libs';
import { TangosCli } from '../libs/tangos-cli';


const util = new Util();
const options = util.getOptions();

const tangosCli = new TangosCli(options);
tangosCli.run();
