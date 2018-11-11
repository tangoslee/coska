import { prompt, Separator } from 'inquirer';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { Util } from '../libs';
// import { Menu } from '@app/core/models';
// import { sep } from 'path';


export const enum CommandsTypes {
  EXIT,
  GO_BACK,
  ADD_POST,
  INIT_THUMBS,
  INIT_INDEX,
  ADD_FAKE_POST,
}

export class MenuService {

  state: any;
  pgidMap: any = {};

  constructor(
    private separator: Separator = new Separator(),
    private util: Util = new Util()
  ) {
    this.state = this.util.loadJSON(`${__dirname}/../../src/assets/api/init.json`);
    const { menus } = this.state;
    this.pgidMap = menus.reduce((hash, { pgid, subMenu }) => {
      if (!pgid) return hash;
      const ppgid = pgid;
      hash[ppgid] = subMenu;

      const subHash = (subMenu)
        ? subMenu.reduce((h, { pgid, layout }) => {
          if (!pgid) return h;
          h[`${ppgid}/${pgid}`] = layout;
          return h;
        }, {})
        : null;
      return (subHash)
        ? { ...hash, ...subHash }
        : hash;

    }, {});
  }

  inquiryCommand(): Promise<any> {
    return prompt([
      {
        type: 'list',
        name: 'cmd',
        message: 'Select a job what you want to run:',
        choices: [
          { name: '1.New post', value: CommandsTypes.ADD_POST },
          { name: '2.Refresh thumnails', value: CommandsTypes.INIT_THUMBS },
          { name: '3.Refresh Indexes', value: CommandsTypes.INIT_INDEX },
          { name: '4.Create fake posts', value: CommandsTypes.ADD_FAKE_POST },
          this.separator,
          { name: 'Exit', value: CommandsTypes.EXIT },
        ],
      },
    ]);
  }

  inquiryMainMenu(): Promise<any> {
    const { menus } = this.state;
    const mainOpts = menus
      .map(({ title, pgid }) => {
        return { name: title, value: pgid };
      });

    return prompt([
      {
        type: 'list',
        name: 'ppgid',
        choices: [
          ...mainOpts,
          this.separator,
          { name: 'Back', value: CommandsTypes.GO_BACK }
        ],
        message: 'Select a menu: ',
      },
    ]);
  }

  inquirySubMenu(ppgid: string): Promise<any> {
    const subMenu = this.pgidMap[ppgid];
    const subOpts = subMenu
      .filter(({ layout }) => layout !== 'header' && layout !== 'divider')
      .map(({ layout, title, pgid }, i) => {
        switch (layout) {
          // case 'divider': {
          //   return this.separator;
          // }
          // case 'header': {
          //   return { name: title };
          // }
          default: {
            return { name: `${i + 1}.${title}`, value: pgid };
          }
        }
      });

    return prompt([
      {
        type: 'list',
        name: 'pgid',
        choices: [
          ...subOpts,
          this.separator,
          { name: 'Back', value: CommandsTypes.GO_BACK }
        ],
        message: 'Select a sub menu: ',
      },
    ]);
  }

  inquiryFakePostNumber(): Promise<any> {
    return prompt([
      {
        type: 'input',
        name: 'qty',
        message: 'How many posts do you want to generate?',
        validate: function (value) {
          if (isNaN(Number(value))) {
            return false;
          }
          return true;
        },
        default: 10
      }
    ]);
  }
}
