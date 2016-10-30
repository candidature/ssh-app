import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Connection, ConnectionStatus } from '../models';
import * as connection from '../actions/connection';
import { v1 } from 'uuid';

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
    case connection.ActionTypes.OPEN: {
      const newConnection = Object.assign({ id: v1() }, connDefaults);
      return {
        ids: [...state.ids, newConnection.id],
        entities: Object.assign({}, state.entities, { [newConnection.id]: newConnection }),
        selectedConnId: newConnection.id
      };
    }

    case connection.ActionTypes.SAVE:
      return state;

    case connection.ActionTypes.SELECT:
      return {
        ids: state.ids,
        entities: state.entities,
        selectedConnId: action.payload
      };

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
export function getConnectionEntities(state$: Observable<State>) {
  return state$.select(state => state.entities);
}

export function getConnectionIds(state$: Observable<State>) {
  return state$.select(state => state.ids);
}

export function getSelectedConnectionId(state$: Observable<State>) {
  return state$.select(state => state.selectedConnId);
}

export function getSelectedConnection(state$: Observable<State>) {
  return combineLatest<{ [id: string]: Connection }, string>(
    state$.let(getConnectionEntities),
    state$.let(getSelectedConnectionId)
  )
    .map(([entities, selectedConnId]) => entities[selectedConnId]);
}

export function getAllConnections(state$: Observable<State>) {
  return combineLatest<{ [id: string]: Connection }, string[]>(
    state$.let(getConnectionEntities),
    state$.let(getConnectionIds)
  )
    .map(([entities, ids]) => ids.map(id => entities[id]));
}

