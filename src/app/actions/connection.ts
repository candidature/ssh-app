import { Action } from '@ngrx/store';
import { type } from '../util';
import { Connection } from '../models/connection';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  OPEN: type('[Connection] Open New'),
  EDIT: type('[Connection] Edit'),
  SAVE: type('[Connection] Save'),
  SELECT: type('[Connection] Select'),
  REMOVE: type('[Connection] Remove'),
  CONNECT: type('[Connection] Connect'),
  DISCONNECT: type('[Connection] Disconnect')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class OpenAction implements Action {
  type = ActionTypes.OPEN;

  constructor() { }
}

export class SaveAction implements Action {
  type = ActionTypes.SAVE;
  constructor(public payload: Connection) { }
}

export class SelectAction implements Action {
  type = ActionTypes.SELECT;
  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = OpenAction | SaveAction | SelectAction;
