import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Connection, ConnectionStatus } from '../models';
import * as connection from '../actions/connection';

export interface State {
  ids: string[];
  entities: { [id: string]: Connection };
  selectedConnId: string | null;
}

const initialState: State = {
  ids: [],
  entities: {},
  selectedConnId: null
};
const connDefaults = { name: 'New connection', host: '', port: 22, status: ConnectionStatus.NEW };
export function reducer(state = initialState, action: connection.Actions): State {
  switch (action.type) {
    case connection.ActionTypes.OPEN:
      return state;
    case connection.ActionTypes.SAVE: {
      return state;
    }
    default:
      return state;
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */
export function getConnections(state$: Observable<State>) {
  return state$.select(state => state.entities);
}

