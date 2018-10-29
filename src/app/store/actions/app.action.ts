import { Action } from '@ngrx/store';
import { Content } from '@app/core/models';
import { Post } from '@app/core/models/post';
import { Section } from '@app/core/models/section';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AppActionTypes {
  // initial status of the app
  GET_STATUS = '[App] GetStatus',
  GET_STATUS_SUCCESS = '[App] GetStatusSuccess',

  // loading spinner
  LOADING = '[App] Loading',
  UNLOADING = '[App] UnLoading',

  // docMeta
  GET_CONTENT = '[App] GetContent',
  GET_CONTENT_SUCCESS = '[App] GetContentSuccess',
  GET_CONTENT_FAILURE = '[App] GetContentFailure',

  GET_DOC_HTML = '[App] GetDocHTML',
  GET_DOC_MARKDOWN = '[App] GetDocMarkdown',
  GET_DOC_XML = '[App] GetDocXML',

  // section
  GET_SECTION = '[App] GetSection',
  GET_SECTION_SUCCESS = '[App] GetSectionSuccess',
  GET_SECTION_FAILURE = '[App] GetSectionFailure',

}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GetStatus implements Action {
  readonly type = AppActionTypes.GET_STATUS;

  constructor(public payload: any = null) { }
}

export class GetStatusSuccess implements Action {
  readonly type = AppActionTypes.GET_STATUS_SUCCESS;

  constructor(public payload: any = null) { }
}

// Content
export class GetContent implements Action {
  readonly type = AppActionTypes.GET_CONTENT;

  constructor(public payload: Content = null) { }
}

export class GetContentSuccess implements Action {
  readonly type = AppActionTypes.GET_CONTENT_SUCCESS;

  constructor(public payload: Content) { }
}

export class GetContentFailure implements Action {
  readonly type = AppActionTypes.GET_CONTENT_FAILURE;

  constructor(public payload: any = null) { }
}

// DocHTML
export class GetDocHTML implements Action {
  readonly type = AppActionTypes.GET_DOC_HTML;

  constructor(public payload: Content = null) { }
}

// DocMarkdown
export class GetDocMarkdown implements Action {
  readonly type = AppActionTypes.GET_DOC_MARKDOWN;

  constructor(public payload: Content = null) { }
}

// DocXML
export class GetDocXML implements Action {
  readonly type = AppActionTypes.GET_DOC_XML;

  constructor(public payload: any = null) { }
}

// Section
export class GetSection implements Action {
  readonly type = AppActionTypes.GET_SECTION;

  constructor(public payload: Content = null) { }
}

export class GetSectionSuccess implements Action {
  readonly type = AppActionTypes.GET_SECTION_SUCCESS;

  constructor(public payload: any) { }
}

export class GetSectionFailure implements Action {
  readonly type = AppActionTypes.GET_SECTION_FAILURE;

  constructor(public payload: any = null) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AppActions
  = GetStatus
  | GetStatusSuccess
  | GetContent
  | GetContentSuccess
  | GetContentFailure
  | GetDocHTML
  | GetDocMarkdown
  | GetDocXML
  | GetSection
  | GetSectionSuccess
  | GetSectionFailure
  ;

