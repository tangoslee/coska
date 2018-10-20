import { Action } from '@ngrx/store';
import { Menu } from '@app/core/models/menu';



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

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AppActions
  = GetStatus
  | GetStatusSuccess;

