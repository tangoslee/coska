#!/usr/bin/env node

import { Util } from '../libs';
import { TangoCli } from '../libs/tango-cli';


const util = new Util();
const options = util.getOptions();

const tangosCli = new TangoCli(options);
tangosCli.run();

