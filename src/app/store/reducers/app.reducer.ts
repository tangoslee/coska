import { Maintenance } from '@app/core/models/maintenance';
import { Menu } from '@app/core/models/menu';
import { AppActions, AppActionTypes } from '../actions/app.action';


export interface State {
  maintenance: Maintenance | null;
  menus: Menu[];
  pgidMap: any;
}

const initialState: State = {
  maintenance: null,
  menus: [],
  pgidMap: {}
};

const hashPgidMap = ms => {
  return ms.reduce((hash, c) => {
    const { title, pgid, type, subMenu } = c;
    if (pgid) {

      hash[pgid] = {
        title,
        pgid,
        type: type ? type : null,
        subMenu: subMenu ? subMenu : null
      };

      if (Object.prototype.hasOwnProperty.call(c, 'subMenu')) {
        const childHash = hashPgidMap(c.subMenu);
        hash = { ...hash, ...childHash };
      }
    }

    return hash;
  }, {});
};

export function reducer(state = initialState, action: AppActions): State {
  switch (action.type) {
    case AppActionTypes.GET_STATUS_SUCCESS: {
      const { maintenance, menus } = action.payload;
      const pgidMap = hashPgidMap(menus);

      return {
        ...state,
        maintenance,
        menus,
        pgidMap
      };
    }

    default: {
      return state;
    }
  }
}
