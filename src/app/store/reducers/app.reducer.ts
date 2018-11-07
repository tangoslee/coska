import { Maintenance } from '@app/core/models/maintenance';
import { Menu } from '@app/core/models/menu';
import { AppActions, AppActionTypes } from '../actions/app.action';
import { Content } from '@app/core/models';
import { Section } from '@app/core/models/section';
// import { Observable } from 'rxjs/Observable';

// import 'rxjs/add/operator/of';
// import { Subscriber } from 'rxjs/Subscriber';

export interface State {
  maintenance: Maintenance | null;
  error: any | null;
  menus: Menu[];
  uriMap: any;
  content: Content | null;
  section: Section | null;
}

const initialState: State = {
  maintenance: null,
  error: null,
  menus: [],
  uriMap: {},
  content: { doctype: 'html', id: 'main', body: '' },
  section: null,
};

const hashURIMap = (menus, parent = null) => {
  return menus.reduce((hash, menu) => {
    const { title, pgid, layout, doctype, display, type, format, subMenu } = menu;
    if (pgid) {
      const id = (parent) ? `${parent}/${pgid}` : pgid;

      hash[id] = {
        title,
        pgid,
        layout,
        doctype,
        display: display ? display : null,
        type: type ? type : null,
        format: format ? format : null,
        subMenu: subMenu ? subMenu : null
      };

      if (Object.prototype.hasOwnProperty.call(menu, 'subMenu')) {
        const childHash = hashURIMap(menu.subMenu, menu.pgid);
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
      const uriMap = hashURIMap(menus);

      return {
        ...state,
        maintenance,
        menus,
        uriMap,
        error: null,
      };
    }

    // Content
    case AppActionTypes.GET_CONTENT_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        content: payload,
        error: null,
      };
    }

    // FIXME: Consider redirecting to 404 page at Effects.
    case AppActionTypes.GET_CONTENT_FAILURE: {
      const { content } = state;
      const error = action.payload;
      return {
        ...state,
        error,
        content: {
          ...content,
          id: '',
          body: null,
          meta: null,
        },
      };
    }

    // Section  FIXME: divide to post.state or other
    // Content
    case AppActionTypes.GET_SECTION_SUCCESS: {
      const { payload } = action;
      const { content } = state;
      return {
        ...state,
        content: { ...content, layout: 'section' },
        section: payload,
        error: null,
      };
    }

    // FIXME: Consider redirecting to 404 page at Effects.
    case AppActionTypes.GET_SECTION_FAILURE: {
      return {
        ...state,
        section: null,
        error: null,
      };
    }


    default: {
      return state;
    }
  }
}
