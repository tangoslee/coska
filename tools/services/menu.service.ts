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
  INTI_INDEX_THUMBS,
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

  async inquiryCommand(): Promise<any> {
    const data = await prompt([
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

    const { cmd } = data;
    if (cmd === CommandsTypes.EXIT) {
      process.exit();
    }

    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }

  inquiryMainMenu(menus: any): Promise<any> {

    const questions = menus
      .map(({ title, pgid }) => {
        return { name: title, value: pgid };
      });

    return prompt([
      {
        type: 'list',
        name: 'ppgid',
        choices: [
          ...questions,
          this.separator,
          { name: 'Back', value: CommandsTypes.GO_BACK }
        ],
        message: 'Select a menu: ',
      },
    ]);
  }

  inquirySubMenu(menus: any): Promise<any> {

    const questions = menus
      .map(({ title, pgid }, i) => {
        return { name: `${i + 1}.${title}`, value: pgid };
      });

    return prompt([
      {
        type: 'list',
        name: 'pgid',
        choices: [
          ...questions,
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


  // Command
  inquirySectionMarkDown(): Promise<any> {
    const layout = 'section';
    const doctype = 'markdown';
    const { menus } = this.state;

    const subMenuMap = {};
    const mainMenus = menus
      .filter(menu => {
        const { subMenu } = menu;
        if (!subMenu) return false;
        subMenuMap[menu.pgid] = subMenu
          .filter(menu => {
            // console.log({ layout, doctype });
            return menu.layout === layout && menu.doctype === doctype;
          });

        return subMenuMap[menu.pgid].length > 0 ? true : false;
      });

    return new Promise(async (resolve, reject) => {

      // console.log({ mainMenus, subMenuMap });
      while (true) {
        const mainAnswers = await this.inquiryMainMenu(mainMenus);
        const { ppgid } = mainAnswers;
        if (ppgid === CommandsTypes.GO_BACK) {
          return resolve({ layout, ppgid, pgid: null });
        }

        const subAnswers = await this.inquirySubMenu(subMenuMap[ppgid]);
        const { pgid } = subAnswers;
        if (pgid !== CommandsTypes.GO_BACK) {
          return resolve({ layout, ppgid, pgid });
        }
      }
    });
  }

  inquirySection(): Promise<any> {
    const layout = 'section';
    const { menus } = this.state;

    const subMenuMap = {};
    const mainMenus = menus
      .filter(menu => {
        const { subMenu } = menu;
        if (!subMenu) return false;
        subMenuMap[menu.pgid] = subMenu
          .filter(menu => {
            return menu.layout === layout;
          });

        return subMenuMap[menu.pgid].length > 0 ? true : false;
      });

    return new Promise(async (resolve, reject) => {

      // console.log({ mainMenus, subMenuMap });
      while (true) {
        const mainAnswers = await this.inquiryMainMenu(mainMenus);
        const { ppgid } = mainAnswers;
        if (ppgid === CommandsTypes.GO_BACK) {
          return resolve({ layout, ppgid, pgid: null });
        }

        const subAnswers = await this.inquirySubMenu(subMenuMap[ppgid]);
        const { pgid } = subAnswers;
        if (pgid !== CommandsTypes.GO_BACK) {
          return resolve({ layout, ppgid, pgid });
        }
      }
    });
  }

}
